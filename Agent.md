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
- Photography route renders a featured photo and gallery from MySQL or local fallback data.
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
- Restyled the navbar avatar into a transparent brush mark without an opaque white, black, or glass circular background.
- Removed the opaque SVG backgrounds, softened light/dark avatar colors, and simplified the spark detail for small sizes.

Context/Decisions:
- Kept the existing logo route behavior, size footprint, and light/dark image switching.
