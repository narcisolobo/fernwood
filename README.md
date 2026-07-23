# Fernwood Pilates Studio

A fictional Pilates studio website built to showcase full-stack development skills — a content-driven small business site paired with a real, working booking system.

**This is a portfolio project.** Fernwood Pilates Studio is not a real business and is not affiliated with any actual studio, gym, or fitness establishment. See the site footer for the same disclaimer.

## What this is

A public-facing marketing site (home, pricing, instructor bios, about, contact) combined with a genuinely functional class scheduling and booking system — not a static mockup. Visitors can sign in, browse a real weekly class schedule with live availability, join a class or its waitlist, and cancel a booking, with automatic waitlist promotion when a spot opens up.

## Features

- **Full weekly class schedule** — current day plus six ahead, filterable by class type (Reformer / Mat), with live spots-open and waitlist counts pulled from the database on every request
- **Magic-link authentication** via Supabase Auth — no password to manage
- **Real booking flow**: join a class (auto-waitlisted if full), cancel a
  booking, and automatic promotion of the longest-waiting waitlisted student when a booked spot is cancelled
- **Session-aware UI** — buttons reflect whether the signed-in user already has an active booking or waitlist spot for a given class, and the join form pre-fills their name on return visits

## Tech stack

- **Next.js** (App Router), TypeScript
- **Tailwind CSS v4 + DaisyUI**
- **Supabase** — Postgres, Auth (magic link), Row Level Security
- **Vitest + React Testing Library** for automated tests

## Architecture notes

A few deliberate decisions worth calling out, since they're not the
"obvious" default:

- **`students` and `enrollments` have Row Level Security enabled with zero direct policies.** No client, authenticated or not, can read or write these tables directly. All access goes through a small set of `security definer` Postgres functions (`book_class`, `cancel_booking`, `get_enrollment_counts`, `get_my_enrollment_status`), each scoped to exactly what it needs to do and nothing more. Aggregate data (like spots-open counts) is exposed publicly; individual enrollment/identity data never is.
- **Identity comes from the session, not client input.** Booking functions read `auth.uid()` / `auth.jwt()` server-side rather than trusting a client-supplied student ID or email.
- **Capacity checks are race-safe.** Booking and cancellation both lock the relevant class row (`for update`) before checking/changing counts, so two near-simultaneous requests can't both slip in under capacity.
- **No admin dashboard.** The public booking flow itself — join, live availability, cancel, auto-promotion — is the project's CRUD showcase, rather than a separate admin-only section.

## Live Demo

[fernwood.narcisolobo.com](https://fernwood.narcisolobo.com)
