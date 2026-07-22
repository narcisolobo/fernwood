# Fernwood Pilates Studio — Remaining Build Steps

## Completed

- **Public site pages** — Home, Pricing, Instructors, About, Contact, all rebuilt from Neon Core → Fernwood (autumn/maroon palette, garden-based DaisyUI theme)
- **Supabase project rebuilt on `public` schema** (moved off the earlier `fernwood`-named schema after standing up a fresh project to separate this app's auth from another project's)
- **Tables**: `instructors`, `classes` (includes `type`: `'reformer' | 'mat'`), `students` (nullable `user_id` → `auth.users`, unique constraint — not a partial index, which caused a real `ON CONFLICT` bug early on), `enrollments`
- **RLS**: locked down by default; `classes`/`instructors` publicly readable; `students`/`enrollments` reachable only through security-definer functions
- **Schedule page**: full week view (current day + 6 ahead), stacked vertically by day, working `Reformer`/`Mat`/`All Classes` filters — URL-param driven (`?date=`, `?type=`), server-rendered
- **Live availability, done correctly**: `get_enrollment_counts` (aggregate-only, safe for public/anon) replaced an earlier direct-table read that was silently blocked by RLS and always showed every class as wide open — real bug, caught by comparing DB rows against the rendered page
- **Auth**: magic link working end-to-end; session refresh via `proxy.ts` (Next.js 16's renamed middleware convention) using `getClaims()`; real `supabaseServerClient()` used everywhere a Server Component needs the session (never the browser client)
- **`book_class` RPC**: identity from `auth.uid()`/session JWT, lazy student creation on first join, capacity-checked booked/waitlisted decision, race-safe via row lock, guards against a double-click re-triggering the wrong outcome
- **`cancel_booking` RPC**: deployed and confirmed working, including auto-promotion of the longest-waiting waitlisted student when a booked spot is cancelled. Fixed a real bug where `RETURNING` on the `UPDATE` was capturing the post-update status ('cancelled') instead of the pre-update one, silently making the promotion branch unreachable — caught via before/after query comparison, not by inspection alone
- **`get_my_enrollment_status` RPC**: session-scoped, powers `JoinButton` showing "Cancel Booking"/"Leave Waitlist" (with a confirmation modal, real class name + formatted date) instead of "Join Class" for a user's own active enrollments
- **Cache correctness**: `revalidatePath` added to both `join-class-action.ts` and `cancel-booking-action.ts` — rows now update immediately after a booking/cancellation instead of requiring a manual refresh
- **Admin dashboard dropped from scope** — the public booking flow (join → live availability → cancel → auto-promotion) is the project's CRUD showcase instead of a separate admin section
- **Testing**: switched to test-first for anything with knowable-in-advance behavior (date parsing, formatting helpers, Server Action validation, component branching on auth/enrollment state) — `date-params.test.ts`, `schedule.test.ts`, `join-class-action.test.ts`, `JoinButton.test.tsx`, `ScheduleControls.test.tsx`, `ClassFilterButtons.test.tsx`
- **`CLAUDE.md`** written — security architecture rules (no direct RLS on `students`/`enrollments`, ever), the date-parsing footgun, server/browser client usage, the URL-param filter pattern
- **`README.md`** written — project description, real GitHub "About" tagline, tech stack, architecture notes, status
- **Accessibility/SEO heading pass**: confirmed every page has exactly one `<h1>` and no duplicate/skipped levels in main content; footer's heading demoted from `<h4>` to `<h3>`, closing the site-wide skip identified in the audit
- **Keyboard-accessible mobile drawer**: state moved into `DrawerContext`/`DrawerProvider`/`useDrawer`; closes on nav-link click; Escape-to-close matching WAI-ARIA APG's dismissal pattern; focus returns to the trigger on close; hamburger trigger swapped from a `<label>` to a real `<button>` (labels don't respond to Enter/Space, only click — the previous trigger was silently unreachable via keyboard)
- **`TrackedToMatch` component**: auto-computes letter-spacing so the "Pilates Studio" tagline matches the rendered width of "Fernwood" above it, recalculating on resize/font-load rather than a hand-tuned value per breakpoint
- **Name pre-fill**: `get_my_student_name` RPC deployed; `defaultName` threaded through `ClassScheduleTable` → `JoinButtonModal`, confirmed deployed and tested, not just written. Accepted behavior: editing the pre-filled name overwrites `students.name` going forward, same as `book_class`'s existing `on conflict` logic — intentional, not a bug
- **Mobile schedule layout**: `ClassScheduleTable` renders two parallel views off the same fetched week data — the existing `<table>` (`WeekTableBody`/`ClassRow`) at `md:` and up, a new stacked-card list (`WeekCardList`/`ClassCard`) below it, following the Fitmix reference. `JoinButton` reused as-is in both, with an added optional `className` for full-width on mobile
- **Old-brand reference sweep**: checked for leftover "Neon"/`neon-glow`-era references (CSS utility names, image alt text, etc.) across the codebase — clean
- **`‹ Week` disabled at the current week's boundary**: `isSameLocalDate` helper added to `date-params.ts`; `ScheduleControls` disables the prev-week button (native `disabled` plus dynamic `aria-disabled`) once the URL's date window starts today, since visitors can no longer navigate into a fully past week
- **Past-time-slot action buttons disabled on today's view**: `hasClassEnded` helper added to `schedule-format.ts` (injectable `now` for testability, no timezone conversion — matches the rest of the app's local-time convention); computed server-side per class in `getSchedule` and threaded through `ClassRow`/`ClassCard` into `JoinButton`, which now shows a disabled "Enrollment Closed" state ahead of the existing open/full/booked/waitlisted branches — applies uniformly, so a booked or waitlisted class that's already happened also shows "Enrollment Closed" instead of "Cancel Booking"/"Leave Waitlist"

## Remaining

### 1. Footer edits

- Add a brief, plain-language cookie disclosure line — no consent banner needed (session/auth cookies only, no analytics/tracking), just a short note per ePrivacy's "strictly necessary" disclosure norm

### 2. Google OAuth (optional convenience layer on top of magic link)

- Requires external setup: Google Cloud OAuth credentials, added to Supabase Auth provider settings
- `book_class` name handling: fall back to `user_metadata.full_name` when available, so Google sign-ins skip the name prompt magic-link users still get

### 3. Mobile / responsive polish

- ~~Font-size accessibility bug: increasing the browser's base font size (independent of viewport width) broke the navbar~~ — fixed by converting the hamburger/desktop-nav collapse logic (`Navbar.tsx`, `Hamburger.tsx`) from viewport breakpoints (`lg:`) to a CSS Container Query (`@container` on the nav row, `@[80rem]:` on the hamburger and desktop-nav wrapper). Book a Class / Sign in intentionally keep their separate `md:` viewport breakpoint.
  - Threshold is `@[80rem]` (1280px), not `@[64rem]` (1024px) — the custom `@utility container` in `globals.css` is stepped, not fluid (jumps `40rem → 48rem → 64rem → 80rem` at each breakpoint and holds flat in between, with no `2xl` step). Between a 1024px and 1279px viewport the nav row is frozen at exactly 1024px of available width, which isn't enough for nav links + Book a Class + divider + "Sign out" (~1067–1091px needed) — collapsing at `64rem` collided in that whole window. `80rem` is the next available step and clears it with margin.
  - Verified with Playwright: viewport sweep 1000–1400px (both "Sign in" and "Sign out" label states) shows no overlap/wrap; 1280px viewport with root font-size doubled still correctly falls back to the hamburger.
- Full copy read-through across all pages

### 4. Meta tags — MVP, required before deployment

- **`robots`** — explicit `robots.txt` and/or per-page meta robots directives
- **`description`** — per-page meta descriptions (currently unset/default)
- **Favicon/icons** — favicon plus any additional sizes (apple-touch-icon, etc.)
- **Manifest** — `manifest.json`/`site.webmanifest` for PWA-adjacent metadata
- **Open Graph / Twitter** — `og:title`, `og:description`, `og:image`, Twitter card tags, per page where it matters (Home at minimum; consider Schedule/Pricing too)

### 5. Custom 404 page — MVP, required before deployment

- Add `not-found.tsx` at the app root (Next.js App Router convention) to replace the framework default — on-brand styling (autumn/maroon palette, existing nav/footer), a friendly line consistent with the site's fictional-studio footer disclaimer, and a link back to Home.

### 6. Deploy

- Vercel, custom subdomain via GoDaddy — same pattern as Countsy and Wurst & Ale
- Update README's "Live link coming soon" once the real URL exists

## Future ideas (not scoped, just noted)

- "Not you? Sign in" option in the join modal, for cases where the pre-filled name/session doesn't match who's actually booking
