# Leo Profolio

Leo Profolio is a personal portfolio website built with Next.js. It is designed as a long-term home for writing, projects, photography, profile information, contact details, and DCS World flight logs.

The site is still under active development. The home page, localized routing, theme switching, navigation shell, and several placeholder content pages are already in place.

## Features

- App Router architecture with Next.js
- Locale-prefixed routes for English, Simplified Chinese, Traditional Chinese, and Japanese
- Automatic redirect from unprefixed paths to the default English route
- Light and dark theme support with `next-themes`
- Responsive navigation with mobile sidebar, language switch, theme switch, and search entry point
- Local font loading for English and Chinese typography
- Content sections for writings, works, photos, flights, profile, and contact

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint
- Lucide React
- next-themes

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Requests without a locale prefix redirect to `/en`.

## Available Scripts

```bash
npm run dev
```

Starts the local development server on port `3000`.

```bash
npm run build
```

Builds the project for production.

```bash
npm run start
```

Runs the production build.

```bash
npm run lint
```

Runs ESLint.

## Project Structure

```text
app/
  [lang]/
    page.tsx          Localized home page
    writings/         Writing page route
    works/            Works page route
    photos/           Photography page route
    flights/          DCS flight log page route
    profile/          Profile page route
    contact/          Contact page route
components/
  layout/             Navbar, sidebar, main layout, and footer
  ui/                 Shared UI pieces
config/
  locales.ts          Supported locale definitions
dictionaries/
  en.json             English navigation and layout copy
  zh.json             Simplified Chinese copy
  hk.json             Traditional Chinese copy
  jp.json             Japanese copy
libs/
  dictionaries.tsx    Dictionary loader
  fonts.ts            Local font configuration
  redirect.ts         Locale redirect helper
providers/
  theme-provider.tsx  Theme provider wrapper
public/
  avatar/             Avatar SVG assets
  fonts/              Local font files
```

## Localization

Supported locales are defined in `config/locales.ts`:

- `en` - English
- `zh` - Simplified Chinese
- `hk` - Traditional Chinese
- `jp` - Japanese

Locale dictionaries live in `dictionaries/`. Each localized page is served under `/:lang`, for example:

- `/en`
- `/zh/photos`
- `/hk/works`
- `/jp/flights`

The middleware redirects unprefixed paths to the default locale, so `/photos` becomes `/en/photos`.

## Development Notes

- Add shared layout copy to the dictionary files.
- Add new locales in `config/locales.ts` and `libs/dictionaries.tsx`.
- Keep route pages inside `app/[lang]/` so they receive the localized layout.
- Theme colors and global styles live in `app/globals.css` and `app/styles/`.

## Status

This project is a personal site in progress. The main structure is ready, while several pages are placeholders waiting for real content, media, and project entries.
