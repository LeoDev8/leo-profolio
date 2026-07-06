# Project Overview
Leo Profolio is a personal portfolio website built with Next.js. It is intended as a long-term home for writings, projects, photography, profile information, contact details, and DCS World flight logs.

The project is under active development. The localized routing shell, theme system, navigation layout, home page, and placeholder/content routes are in place. The photography page can read published photo records from MySQL and falls back to local seed data when the database is unavailable or fallback is enabled. Projects now have a MySQL table, restore seed script, and REST API surface; the localized Projects page remains a placeholder.

# Tech Stack
- Next.js 16.2.9 with App Router
- React 19.2.1
- TypeScript 5 with strict mode
- Tailwind CSS 4 via `@tailwindcss/postcss`
- ESLint 9 with `eslint-config-next`
- `next-themes` for light/dark theme switching
- `lucide-react` for icons
- `mysql2/promise` for MySQL access
- Local fonts loaded from `public/fonts`

# Core Conventions
- Treat `Agent.md` as the project source of truth. Read it before starting each task and update it after significant features, fixes, or at session end.
- Keep the last 5-10 session history entries visible; archive older history if the file becomes too long.
- Use locale-prefixed routes under `app/[lang]/` for user-facing pages.
- Supported locales are defined in `config/locales.ts`; update dictionary loading and copy when adding locales.
- Keep shared layout copy in `dictionaries/` and page-specific content in `content/`.
- Use server-side data helpers for database-backed content. Photography data flows through `libs/photos.ts`.
- Preserve MySQL fallback behavior for photography unless explicitly changing deployment assumptions.
- Prefer existing glass/surface UI primitives (`GlassPanel`, `SectionShell`, `AnimatedLinkCard`) for visual consistency.
- Use `@/*` imports from the project root.
- Use `apply_patch` for manual code edits during agent work.

# Architecture Map
- `app/`: Next.js App Router root, global layout, global styles, and localized route tree.
- `app/[lang]/`: Locale-prefixed pages and localized layout wrapping navbar, main content, and footer.
- `app/styles/`: Theme variables and light/dark token files.
- `components/layout/`: Site shell components including navbar, sidebar, main wrapper, and footer.
- `components/ui/`: Shared UI components, navbar controls, logo, and surface primitives.
- `config/`: Project configuration such as supported locales.
- `content/`: Page-specific structured content for home, writings, and photos.
- `dictionaries/`: Locale dictionaries for navigation and layout copy.
- `libs/`: Shared utilities, dictionary loading, redirect logic, font setup, photo data access, and database helpers.
- `libs/db/`: MySQL pool setup and database configuration helpers.
- `db/migrations/`: SQL migrations, currently including the `photo_works` and `projects` tables.
- `db/seed/`: Seed data for photography records.
- `scripts/db/`: Database creation, migration, seeding, and connection test scripts.
- `providers/`: App-level providers, currently theme provider wiring.
- `public/fonts/`: Local font assets.

# Current Progress
Current state:
- Localized portfolio shell is implemented for English, Simplified Chinese, Traditional Chinese, and Japanese.
- Theme switching is wired with dark as the default theme.
- Home page uses reusable surface components and localized content.
- Pages exist for writings, projects, photos, flights, profile, and contact.
- Photography route renders a featured photo, masonry gallery, and routed fullscreen photo viewer from MySQL or local fallback data.
- Database scripts support creating the database, running ordered migrations, seeding photo/project records, and testing the connection.

Next likely work:
- Replace placeholder route content with final portfolio copy and media.
- Add real images under `public/photos/` or configure hosted image sources.
- Expand project entries and writing content.
- Validate production deployment environment variables for MySQL.
- Run `npm run lint` and `npm run build` before release-oriented changes.

# Session History

## 2026-07-01 / Initial Agent.md Setup
Changes Made:
- Created `Agent.md`.
- Scanned project structure, package metadata, README, layouts, locale config, styling, photo page, photo data helper, and MySQL migration.

Context/Decisions:
- Established `Agent.md` as the durable project memory and handoff document.
- Documented the app as a localized Next.js portfolio using App Router, Tailwind CSS 4, `next-themes`, and MySQL-backed photography with local fallback.
- Captured current architecture and conventions from existing files instead of assuming unverified implementation details.

New Instructions:
- Before starting future tasks, read `Agent.md` for project context.
- After significant work or at session end, propose and apply a concise update to `Agent.md` without deleting recent history.

## 2026-07-01 / Projects Route And Database API
Changes Made:
- Renamed the user-facing Works route/navigation to Projects and added a locale-aware redirect from `/:lang/works` to `/:lang/projects`.
- Added the `projects` MySQL migration, seed data, and `npm run db:seed:projects` restore command.
- Updated migration runner to apply all ordered SQL files in `db/migrations/`.
- Added REST API routes for project list/create/read/update/delete with public reads and `PROJECTS_ADMIN_TOKEN`-protected writes.

Context/Decisions:
- Projects content uses single English fields for v1.
- The localized Projects page remains a placeholder; it does not consume project table data yet.
- Write APIs accept either `Authorization: Bearer <PROJECTS_ADMIN_TOKEN>` or `x-admin-token`.

## 2026-07-01 / Glass Avatar Refresh
Changes Made:
- Restyled the navbar avatar into a transparent brush mark on a soft glass circular background.
- Removed the opaque SVG backgrounds, softened light/dark avatar colors, and simplified the spark detail for small sizes.

Context/Decisions:
- Kept the existing logo route behavior, size footprint, and light/dark image switching.

## 2026-07-02 / Ice Blue Glass Theme
Changes Made:
- Shifted the light and dark theme tokens from green-tinted glass to an ice blue/glacier blue palette.
- Updated global background glow layers and glass panel highlights to make the glass effect more visible, especially in light mode.
- Kept the existing glass component API and layout components unchanged so navbar, footer, sidebar, and panels inherit the new theme automatically.

Context/Decisions:
- Ice blue was chosen because it best communicates transparency, cold reflections, and glass-like refraction without feeling like a saturated tech-blue theme.
- Light mode now uses a soft blue-tinted background instead of a near-white page background.
- `npm run lint` passed after the theme changes.
- Local dev preview could not be started in the current sandbox because port listening was denied.

## 2026-07-02 / Theme Wave Transition
Changes Made:
- Added a View Transition based wave reveal when the dark/light navbar button is clicked.
- The wave origin is calculated from the clicked theme button and expands across the viewport until the new theme is fully visible.
- Added a normal instant theme-switch fallback for browsers without View Transition support and for reduced-motion users.

Context/Decisions:
- The implementation lives in `components/ui/navbar/darkmode-switch.tsx` and `app/globals.css`, so all desktop, tablet, and mobile theme buttons share the same behavior.
- The reveal animation now uses a simple `ease-in-out` View Transition from zero radius to full viewport coverage, avoiding intermediate pauses and end-of-animation bounce.
- `npm run lint` passed after the animation change.
- `npm run build` could not complete in the current sandbox because Turbopack attempted to bind an internal port and the environment returned `Operation not permitted`.

## 2026-07-02 / AI Photo Gallery Seed
Changes Made:
- Generated 8 AI street-documentary style photography placeholders for the Photos page.
- Stored source PNGs under `assets/photos/originals/gpt-image2/` and public WebP display exports under `public/photos/works/`.
- Expanded `db/seed/photos.json` from 4 placeholder records to 8 records with real `src` values, alt text, orientations, and exposure metadata.

Context/Decisions:
- Original generated images are intentionally outside `public/`; the database and page only reference optimized WebP display files.
- The `photo_works` schema was not changed; `src` continues to store the public display image path.
- Alt text identifies the images as AI-generated so the seed content is not presented as real photography.
- `npm run lint` passed after the gallery seed update.
- `npm run db:seed:photos` could not connect to local MySQL in the current sandbox because `127.0.0.1:3306` returned `EPERM`.

## 2026-07-03 / Photos Masonry Display
Changes Made:
- Reworked the localized Photos page into a simple photography wall with location filters and a CSS columns masonry layout.
- Added a client-side gallery component that keeps photos in their natural image proportions and shows each frame as a clean white print-style card.
- Simplified photo page copy and changed metadata display to direct values like `35mm f/4 1/250s ISO200` without technical parameter labels.
- Refined the photo cards to use the site's glass/theme colors instead of white print styling, removed visible per-photo titles, and moved exposure data into a subtle hover/mobile overlay.

Context/Decisions:
- Preserved the existing `getPhotoWorks()` MySQL/local fallback data flow and did not change the `photo_works` schema.
- Filters are derived from each photo's existing `location` field with a localized all-photos option.
- Exposure metadata is useful as optional supporting context, but should not dominate the gallery; titles remain data fields but are no longer shown on the photo cards.
- `npm run lint` passed after the display rewrite.
- `npm run build` still fails in the current sandbox because Turbopack attempts to bind an internal port and receives `Operation not permitted`.

## 2026-07-06 / Photos Lightbox Viewer
Changes Made:
- Added a fullscreen glass/ice-blue lightbox to the Photos masonry gallery without changing the existing columns layout or photo data flow.
- Photo cards now open an accessible viewer with close, previous, and next controls, plus keyboard navigation for Escape and arrow keys.
- Added mobile-friendly swipe navigation and compact mobile previous/next controls.
- Kept the exposure metadata treatment concise in both the card overlay and viewer, with subdued title/location/date context below the image.

Context/Decisions:
- The implementation stays inside `components/photos/photos-gallery.tsx` and uses React state/effects plus existing `lucide-react` icons.
- Missing-image photo records remain navigable in the lightbox and show the existing fallback message.
- `npm run lint` and `npx tsc --noEmit` passed after the lightbox upgrade.

## 2026-07-06 / Photos Hover And Dark Viewer Refinement
Changes Made:
- Tuned the Photos gallery hover state toward an Unsplash-like interaction with a zoom cursor, subtle dark image mask, and in-image photo metadata.
- Darkened the fullscreen viewer backdrop so the page recedes while the selected photo remains clear, centered, and undimmed.
- Restyled fullscreen previous/next controls as side-positioned dark glass buttons with blue accent hover states.

Context/Decisions:
- Preserved the masonry/photo wall layout, existing concise exposure metadata format, keyboard navigation, and mobile swipe behavior.
- `npm run lint` and `npx tsc --noEmit` passed after the refinement.

## 2026-07-06 / Routed Photos Viewer
Changes Made:
- Changed Photos gallery clicks from local lightbox state to locale-aware routes like `/:lang/photos/:photoId`.
- Added deterministic encoded photo ids derived from each photo slug, using code-like public ids without changing the database schema.
- Added a routed fullscreen dark viewer page with centered clear photo display, close link back to the gallery, and wraparound previous/next photo links.

Context/Decisions:
- The existing photo `slug` remains the source of truth; encoded ids are obfuscation rather than secure encryption.
- The masonry gallery hover mask and concise exposure metadata treatment were preserved.
- `npm run lint` and `npx tsc --noEmit` passed after the routed viewer change.

## 2026-07-06 / Routed Viewer Glass Mask Fixes
Changes Made:
- Added an explicit Back to photos action beside the close button on routed photo viewer pages.
- Reworked the routed viewer backdrop from near-black to a translucent glass/water mask so the site remains visible behind the photo.
- Adjusted main content stacking so the fullscreen routed viewer can cover the entire website, including the fixed navbar.

Context/Decisions:
- Kept the selected photo clear, centered, and undimmed while softening only the surrounding interface.
- `npm run lint` and `npx tsc --noEmit` passed after the routed viewer fixes.
