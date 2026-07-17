# Fernwood — Remaining Build Steps

## 1. Supabase setup

- Create the `neoncore` schema + all four tables (`instructors`, `classes`, `students`, `enrollments`) with `capacity` included
- Expose the `neoncore` schema in Settings → API
- Enable RLS on all tables (locked down by default — no direct table access from the client)
- Create and grant the `book_class` RPC function
- Seed real data: instructors from existing bios, a believable weekly class schedule (Fitmix pattern as reference — morning cluster, midday lull, evening cluster)

## 2. Public Schedule page

- Server Component query joining `classes` → `instructors`, grouped by day
- "Join Class" button wired to the `book_class` RPC (client-side call, since it's a user-triggered mutation)
- Confirmation UI that reflects the actual returned status — "You're in!" vs. "You're on the waitlist"

## 3. Supabase Auth for `/admin`

- Enable email/password provider
- Manually create one admin user in the dashboard
- Login page + session-check middleware protecting all `/admin/*` routes
- Contact line on login screen ("Email narciso@narcisolobo.com for credentials")

## 4. Admin dashboard — Roster & Check-in

- Server Component reading `enrollments` joined to `students` + `classes`, grouped by class
- Check-in action (Server Action flipping `status` to `checked_in`), replacing the static HTML mockup's fake button

## 5. Admin dashboard — Waitlist

- Same data source, filtered to `status = 'waitlisted'`, ordered by `created_at`
- "Promote" action flipping status to `booked` (manual version of auto-fill)

## 6. Class CRUD

- Admin-only create/edit/delete on `classes`
- Decide whether this needs its own screen or slots into the existing Roster view as an "add class" affordance

## 7. Polish pass

- Mobile/responsive tweaks flagged earlier and set aside
- Any leftover dark-mode color issues (pastel philosophy icons) if revisiting
- Final read-through of copy across all pages

## 8. Deploy

- Vercel, custom subdomain via GoDaddy — same pattern as Countsy

---

Steps 1–5 are the core "real working demo" milestone. Steps 6–7 are legitimate but more discretionary if time-constrained. Step 8 is quick once everything else is done.
