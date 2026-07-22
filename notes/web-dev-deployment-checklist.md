# Final Pre-Deployment Checklist for Web Applications

A comprehensive checklist for wrapping up the initial development cycle of full-stack web applications, specifically optimized for Next.js and Supabase projects.

---

## 1. Next.js & Frontend Infrastructure

- [ ] **Metadata & Open Graph (OG)**
  - Define static or dynamic metadata in `layout.tsx` or `page.tsx` using the Next.js `Metadata` API (`title`, `description`, `openGraph`, `twitter`).
  - Add an `opengraph-image.png` (or dynamic `route.tsx`) so link previews render cleanly on platforms like LinkedIn and X/Twitter.
  - Configure favicon and app icons in the `/app` directory (`favicon.ico`, `apple-icon.png`).

- [ ] **Custom Error & Boundary Pages**
  - Create a custom `/app/not-found.tsx` page for 404 handling (e.g., non-existent dynamic routes or missing resource IDs).
  - Implement `/app/error.tsx` (and `global-error.tsx`) with a user-friendly message and a retry action to handle uncaught errors gracefully.

- [ ] **Loading States & Suspense Boundaries**
  - Implement `loading.tsx` or React Suspense boundaries around server-rendered components to provide immediate visual feedback.
  - Add active/pending UI states and disable buttons during async actions (e.g., booking confirmation or waitlist submission) to prevent duplicate calls.

- [ ] **Asset & Font Optimization**
  - Use `next/image` for all images with explicit dimensions or layout properties (`fill`, `sizes`, `priority`).
  - Load custom typography locally using `next/font` to eliminate layout shifts and third-party network bottlenecks.

---

## 2. Supabase, Auth & Database Security

- [ ] **Row Level Security (RLS) Audit**
  - Enable RLS on all public database tables (`bookings`, `waitlists`, `schedules`, `profiles`).
  - Define explicit security policies ensuring users can only insert, update, or delete records associated with their own `auth.uid()`.

- [ ] **Auth Redirect Configuration**
  - Update the Supabase Dashboard (**Auth -> URL Configuration**) to whitelist production site domains alongside `localhost`.
  - Verify magic link authentication flows seamlessly across desktop and mobile browsers.

- [ ] **Database Indexing**
  - Add database indexes to high-frequency foreign keys (`class_id`, `user_id`, `created_at`) to ensure queries remain performant as dataset sizes grow.

- [ ] **Environment Variable Verification**
  - Set production environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in your hosting provider (e.g., Vercel).
  - Ensure sensitive administrative keys (such as service role keys) remain strictly isolated in server environments.

---

## 3. Web Accessibility (a11y) & UX Polish

- [ ] **Keyboard Navigation & Focus Management**
  - Ensure all interactive elements, dialogs, and navigation menus can be traversed using `Tab`, `Enter`, `Space`, and `Escape`.
  - Verify focus returns to a logical origin element after closing modals or slide-over panels.

- [ ] **ARIA Attributes & Semantic Markup**
  - Use semantic HTML tags (`<main>`, `<nav>`, `<header>`, `<article>`, `<button>`).
  - Attach clear accessibility labels and state indicators (`aria-disabled="true"`, `aria-expanded`, `aria-label`) to custom components.

- [ ] **Color Contrast & User Feedback**
  - Check text contrast ratios for all UI states (badges, disabled buttons, status tags) against WCAG AA requirements.
  - Implement explicit toast notifications or status alerts for success and error events.

---

## 4. Quality Assurance & Performance

- [ ] **Lighthouse Audit**
  - Run Lighthouse audits in Chrome Incognito mode to confirm high scores in Performance, Accessibility, Best Practices, and SEO.

- [ ] **Cross-Device & Responsive Testing**
  - Validate UI layouts across mobile, tablet, and desktop viewports, focusing particularly on touch target sizes and scroll behavior.

- [ ] **Build & Code Quality Verification**
  - Run the production build command (`pnpm build` or equivalent) locally to catch build-time TypeScript errors or unhandled imports.
  - Run linter checks (`pnpm lint`) and clean up temporary logs, unused code, or debug code.

---

## 5. Portfolio Showcase & Documentation

- [ ] **Realistic Demo Data**
  - Seed database tables with realistic, date-relevant sample data so reviewers land on an active application state.

- [ ] **Repository Documentation**
  - Write a clean `README.md` containing:
    - Project Overview & Architecture
    - Tech Stack Highlights (Next.js App Router, Supabase RLS, Tailwind, etc.)
    - Key Operational Features
    - Database Schema / ERD Summary
    - Local Setup & Environment Configuration Instructions
