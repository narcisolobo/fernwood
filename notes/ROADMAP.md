# Fernwood Pilates Studio — Remaining Build Steps

## Completed

- **Public site pages** — Home, Pricing, Instructors, About, Contact, all rebuilt from Neon Core → Fernwood (autumn/maroon palette, garden-based DaisyUI theme)
- **Supabase project rebuilt on `public` schema** (moved off the earlier `fernwood`-named schema after standing up a fresh project to separate this app's auth from another project's)
- **Tables**: `instructors`, `classes` (now includes `type`: `'reformer' | 'mat'`), `students` (now includes nullable `user_id` → `auth.users`), `enrollments`
- **RLS**: locked down by default; `classes`/`instructors` publicly readable; `students`/`enrollments` reachable only through security-definer functions
- **Schedule page**: full week view (current day + 6 ahead), stacked vertically by day, with working `Reformer`/`Mat`/`All Classes` filters — all URL-param driven (`?date=`, `?type=`), server-rendered, live spots-open/waitlist counts per class
- **Auth**: magic link working end-to-end; session refresh handled via `proxy.ts` (Next.js 16's renamed middleware convention) using `getClaims()`; real `supabaseServerClient()` now used in `lib/schedule.ts` instead of the browser client
- **`book_class` RPC**: identity from `auth.uid()`/session JWT (not client-supplied email), lazy student creation on first join, capacity-checked booked/waitlisted decision, race-safe via row lock
- **`cancel_booking` RPC written** (not yet deployed to Supabase): cancels an active enrollment, auto-promotes the longest-waiting waitlisted student when a *booked* spot frees up
- **Admin dashboard dropped from scope** — the public booking flow (join → live availability → cancel → auto-promotion) now serves as the project's CRUD showcase instead of a separate admin section

## Remaining

### 1. Deploy the booking functions
- Run the updated `book_class` (checked_in status removed) and new `cancel_booking` SQL against Supabase

### 2. Frontend booking state
- `JoinButton` → swap to a **"Cancel Booking"** button for a student's own active enrollments (booked or waitlisted), calling `cancel_booking`
- `getSchedule`/`getWeekSchedule` need to cross-reference the current signed-in user's enrollments so the correct button renders on load, not just after a click

### 3. Google OAuth (optional convenience layer on top of magic link)
- Requires external setup: Google Cloud OAuth credentials, added to Supabase Auth provider settings
- `book_class` name handling: fall back to `user_metadata.full_name` when available, so Google sign-ins skip the name prompt magic-link users still get

### 4. Footer additions before deploy
- Cookie disclosure line — no consent banner needed (session/auth cookies only, no analytics/tracking), but worth a plain-language line per ePrivacy's "strictly necessary" disclosure norm

### 5. Polish pass
- Mobile/responsive tweaks flagged earlier and set aside
- Full copy read-through across all pages
- Sanity check for leftover "Neon"/old-brand references (CSS utility names like `neon-glow`, image alt text, etc.)

### 6. Deploy
- Vercel, custom subdomain via GoDaddy — same pattern as Countsy and Wurst & Ale
