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
- **Accessibility/SEO heading pass**: confirmed every page has exactly one `<h1>` and no duplicate/skipped levels in main content; footer's heading currently sits at `<h4>` with no `<h3>` anywhere on the site — identified fix is demoting it to `<h3>`, not yet applied
- **Keyboard-accessible mobile drawer**: state moved into `DrawerContext`/`DrawerProvider`/`useDrawer`; closes on nav-link click; Escape-to-close matching WAI-ARIA APG's dismissal pattern; focus returns to the trigger on close; hamburger trigger swapped from a `<label>` to a real `<button>` (labels don't respond to Enter/Space, only click — the previous trigger was silently unreachable via keyboard)
- **`TrackedToMatch` component**: auto-computes letter-spacing so the "Pilates Studio" tagline matches the rendered width of "Fernwood" above it, recalculating on resize/font-load rather than a hand-tuned value per breakpoint

## Remaining

### 1. Footer edits
- Demote footer section heading from `<h4>` to `<h3>` (closes the skip identified in the heading audit)
- Add a brief, plain-language cookie disclosure line — no consent banner needed (session/auth cookies only, no analytics/tracking), just a short note per ePrivacy's "strictly necessary" disclosure norm

### 2. Verify name pre-fill
- `get_my_student_name` RPC + threading `defaultName` through `ClassScheduleTable` → `JoinButtonModal` was handed to Claude Code as a prompt — confirm it's deployed and actually tested, not just written
- Known accepted behavior: editing the pre-filled name overwrites `students.name` going forward (same as `book_class`'s existing `on conflict` logic) — this is intentional, not a bug to fix

### 3. Google OAuth (optional convenience layer on top of magic link)
- Requires external setup: Google Cloud OAuth credentials, added to Supabase Auth provider settings
- `book_class` name handling: fall back to `user_metadata.full_name` when available, so Google sign-ins skip the name prompt magic-link users still get

### 4. Mobile / responsive polish — current focus
- Schedule table needs a real mobile layout (stacked rows, no column headers, following the Fitmix reference)
- **Font-size accessibility bug found, not yet fixed**: increasing the browser's base font size (independent of viewport width) breaks the navbar — nothing wraps, and `TrackedToMatch`'s computed letter-spacing (calculated for one line) stays applied after the tagline wraps to two lines, producing visibly broken spacing. Root cause: layout reacts to viewport-width breakpoints only, not actual available space. `whitespace-nowrap` applied as a partial mitigation (prevents the two-line corruption); the real fix is likely converting the navbar's collapse logic to CSS Container Queries (`@container`) so it responds to genuine rendered width regardless of *why* that width is tight (narrow phone screen or 200% text size — same problem, same fix)
- Full copy read-through across all pages
- Sanity check for leftover "Neon"/old-brand references (CSS utility names like `neon-glow`, image alt text, etc.)

### 5. Deploy
- Vercel, custom subdomain via GoDaddy — same pattern as Countsy and Wurst & Ale
- Update README's "Live link coming soon" once the real URL exists

## Future ideas (not scoped, just noted)

- "Not you? Sign in" option in the join modal, for cases where the pre-filled name/session doesn't match who's actually booking
- **Disable `‹ Week` at the current week's boundary.** "Current week" = the rolling 7-day window whose start date equals today (local-date comparison, same convention used elsewhere). Disable rather than clamp — a disabled button is a clearer signal than a click that silently does nothing.
- **Disable past-time-slot action buttons on today's view.** A class earlier today whose `start_time` has already passed shouldn't show a live "Join Class"/"Join Waitlist" button. Grey out and disable with a label like "Class ended" (matching the existing muted/disabled visual language used for "Class Full"), rather than hiding the row — hiding would make the day look like it has fewer classes than it actually does. Disabling `‹ Week` at the boundary above means this only needs to be solved for *today's* window, not arbitrary past weeks, since visitors can no longer browse into fully past weeks at all.
