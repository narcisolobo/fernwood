# Fernwood Pilates Studio — Remaining Build Steps

## MVP

### 1. Mobile / responsive polish

- [ ] Full copy read-through across all pages
- [ ] Touch-target size check on the Schedule page specifically — several `btn-sm` action buttons per row; verify against WCAG's ~44px target-size guidance now that both the table and mobile card layouts are in place

### 2. Meta tags — required before deployment

- [x] **`robots`** — explicit `robots.txt` and/or per-page meta robots directives
- [x] **`description`** — per-page meta descriptions (currently unset/default)
- [ ] **Favicon/icons** — favicon plus any additional sizes (apple-touch-icon, etc.)
- [ ] **Manifest** — `manifest.json`/`site.webmanifest` for PWA-adjacent metadata
- [ ] **Open Graph / Twitter** — `og:title`, `og:description`, `og:image`, Twitter card tags, per page where it matters (Home at minimum; consider Schedule/Pricing too)

### 3. Custom 404 page — required before deployment

- [x] Add `not-found.tsx` at the app root (Next.js App Router convention) to replace the framework default — on-brand styling (autumn/maroon palette, existing nav/footer), a friendly line consistent with the site's fictional-studio footer disclaimer, and a link back to Home.

### 4. Error handling & loading states — required before deployment

- [ ] **`error.tsx`** at the app root — an on-brand error boundary for uncaught failures, matching `not-found.tsx`'s styling. Genuinely higher-stakes than it sounds: `book_class`/`cancel_booking` are live mutations against a real Supabase project that's already had one real outage during this build. Without this, any unhandled failure falls through to Next.js's default generic error screen.
- [ ] **`loading.tsx` for the Schedule route** — `ClassScheduleTable` is `force-dynamic` with real async Supabase calls and currently has no fallback shown while that resolves; matters more in production (real network latency) than it did on localhost.
- [ ] `global-error.tsx` (root-layout-level crashes) — deferred to Post-Deployment, rarer edge case, lower priority than the two above.

### 5. Supabase Auth redirect allowlist — required before deployment

- [ ] Add the real production domain to Supabase Dashboard → Auth → URL Configuration once a Vercel URL exists. Magic-link redirects work on localhost today but will silently fail in production without this — easy to forget since nothing local will catch it.

### 6. Build, lint, and debug-log cleanup — required before deployment

- [ ] Run a full production build (`next build` or equivalent) locally to catch build-time TypeScript errors before deploying
- [ ] Run lint and clean up temporary/debug code
- [ ] Specifically confirm the `referenceWidth`/`naturalTargetWidth` `console.log`s added while debugging `TrackedToMatch`'s width-measurement bug were actually removed, not just assumed gone

### 7. Lighthouse audit — required before deployment

- [ ] Run in Chrome Incognito to get an unbiased baseline across Performance, Accessibility, Best Practices, and SEO
- [ ] Fix whatever it flags before a reviewer finds it first

### 8. Reset/clean seed data before launch

- [ ] Decide whether to reset real personal data (`ciso@cisocodes.com` and associated test bookings/waitlist entries) currently sitting in the live database from manual testing, before pointing reviewers at the live site. Not a security exposure — that table isn't publicly readable — but worth a deliberate decision either way.

### 9. Deploy

- [ ] Deploy to Vercel, custom subdomain via GoDaddy — same pattern as Countsy and Wurst & Ale
- [ ] Update README's "Live link coming soon" once the real URL exists

## Post-Deployment

### 1. Google OAuth (optional convenience layer on top of magic link)

- [ ] External setup: Google Cloud OAuth credentials, added to Supabase Auth provider settings
- [ ] `book_class` name handling: fall back to `user_metadata.full_name` when available, so Google sign-ins skip the name prompt magic-link users still get

### 2. Identity Check

- [ ] "Not you? Sign in" option in the join modal, for cases where the pre-filled name/session doesn't match who's actually booking

### 3. Database indexing on foreign keys

- [ ] Add indexes to `class_id`, `student_id`, `instructor_id` once real traffic/data volume justifies it — correct standard practice, but premature at current scale (a few dozen rows), not a launch blocker

### 4. Replace `window.alert()`/inline text feedback with real toast notifications

- [ ] Current pattern (browser `alert()` for errors, inline text for success) works but isn't polished — genuine UX improvement, not a launch blocker

### 5. Verify asset/font optimization

- [ ] Confirm all images go through `next/image` with explicit sizing
- [ ] Confirm custom fonts load via `next/font` — likely already correct given how the site was built, but worth an explicit verification pass rather than assuming

### 6. README schema/ERD summary

- [ ] Add a visual database schema diagram to accompany the existing architecture notes — nice addition, not blocking, since the security model is already documented in prose
