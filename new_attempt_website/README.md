# Personal Site

A calm, minimal, content-driven personal site built with [Astro](https://astro.build),
[Tailwind CSS](https://tailwindcss.com), and Markdown. Designed for long-form writing,
reflection, and long-term publishing.

---

## Philosophy

This site is built around one idea: **adding content should be nearly zero friction**.
Drop a Markdown file into the right folder, and a new page appears automatically —
no HTML editing, no routing configuration, no rebuild scripts to manage.

The design prioritizes reading. Typography, spacing, and rhythm are primary. Animations
and decoration are secondary (and mostly absent).

---

## Features

- **Auto-generated pages** from Markdown/JSON in `src/content/`
- **8 sections**: Home, Writings, Logs, Now, Quotes, Links, Bookshelf, About
- **Dark mode** with system preference detection + toggle
- **RSS feed** at `/rss.xml`
- **Sitemap** auto-generated at `/sitemap-index.xml`
- **Tag system** — tag pages auto-generated from frontmatter
- **Archive page** — all content chronologically
- **Previous/Next navigation** on all posts
- **Reading time** estimation
- **Reading progress bar** on long posts
- **SEO + OpenGraph** metadata on every page
- **Responsive** — reads beautifully on mobile
- **No JavaScript** beyond dark mode toggle and progress bar
- **No trackers, no analytics, no cookies**

---

## Project Structure

```
src/
├── content/            ← All content lives here
│   ├── config.ts       ← Collection schemas (Zod validation)
│   ├── writings/       ← Long-form essays (.md or .mdx)
│   ├── logs/           ← Short notes (.md or .mdx)
│   ├── quotes/         ← Saved quotes (.json)
│   ├── links/          ← Saved links (.json)
│   └── bookshelf/      ← Books (.json)
├── layouts/
│   ├── Base.astro      ← HTML shell, <head>, SEO, dark mode
│   ├── Site.astro      ← Full page with header + footer
│   └── Prose.astro     ← Long-form reading layout
├── components/
│   ├── Header.astro    ← Navigation + dark mode toggle
│   ├── Footer.astro    ← Footer links
│   ├── PostCard.astro  ← Writing/log list item
│   └── PageHeader.astro← Section page title
├── pages/
│   ├── index.astro     ← Home
│   ├── about.astro     ← About
│   ├── now.astro       ← /now page (edit manually)
│   ├── quotes.astro    ← Quotes collection
│   ├── links.astro     ← Links collection
│   ├── bookshelf.astro ← Bookshelf collection
│   ├── archive.astro   ← All content, chronological
│   ├── rss.xml.ts      ← RSS feed endpoint
│   ├── writings/
│   │   ├── index.astro       ← Writings list
│   │   └── [slug].astro      ← Auto-generated writing pages
│   ├── logs/
│   │   ├── index.astro       ← Logs list
│   │   └── [slug].astro      ← Auto-generated log pages
│   └── tags/
│       ├── index.astro       ← All tags
│       └── [tag].astro       ← Auto-generated tag pages
├── lib/
│   ├── config.ts       ← Site name, nav, metadata
│   └── utils.ts        ← Dates, reading time, sorting helpers
└── styles/
    └── global.css      ← Fonts, base styles, CSS variables
```

---

## Setup

### Prerequisites

- [Node.js](https://nodejs.org) v18 or later
- npm (comes with Node)

### Install

```bash
git clone https://github.com/yourname/yoursite
cd yoursite
npm install
```

### Develop

```bash
npm run dev
```

Opens at `http://localhost:4321`. Changes to content or code hot-reload instantly.

### Build

```bash
npm run build
npm run preview   # preview the built site locally
```

---

## Configuration

### 1. Update site metadata

Edit `src/lib/config.ts`:

```ts
export const SITE = {
  name: 'Your Name',
  title: 'Your Name — Writing & Reflection',
  description: 'A personal site. Essays, logs, notes, and collected things.',
  url: 'https://yourname.com',   // ← your actual domain
  author: 'Your Name',
  email: 'you@yourname.com',
  // ...
};
```

### 2. Update astro.config.mjs

```js
export default defineConfig({
  site: 'https://yourname.com',  // ← matches SITE.url
  // ...
});
```

### 3. Replace the favicon

Edit `public/favicon.svg` — change the letter and colors to match your identity.

### 4. Edit the About page

`src/pages/about.astro` — replace the placeholder text with your own.

### 5. Edit the Now page

`src/pages/now.astro` — update `lastUpdated` and the content sections.

---

## Adding Content

### New Writing (essay)

Create `src/content/writings/your-slug.md`:

```md
---
title: Your Essay Title
description: A one-sentence description for listings and SEO.
date: 2025-02-01
tags: [writing, ideas]
---

Your essay content here. Supports full Markdown and MDX.
```

That's it. A page appears at `/writings/your-slug`. It's added to the writings
list, archive, RSS feed, sitemap, and any relevant tag pages — automatically.

**Frontmatter fields:**

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✓ | Post title |
| `description` | — | Shown in listings + SEO meta |
| `date` | ✓ | Publication date (YYYY-MM-DD) |
| `updated` | — | Last updated date |
| `tags` | — | Array of tags |
| `draft` | — | `true` = hidden in production |
| `featured` | — | For future homepage highlighting |

### New Log (short note)

Create `src/content/logs/your-slug.md`:

```md
---
title: A brief observation
date: 2025-02-03
tags: [observation]
---

A short thought. No description needed. Keep it brief.
```

Appears at `/logs/your-slug`.

### New Quote

Create `src/content/quotes/author-keyword.json`:

```json
{
  "text": "The quote text.",
  "author": "Author Name",
  "source": "Book Title",
  "tags": ["philosophy"],
  "date": "2025-02-01"
}
```

`source` and `date` are optional.

### New Link

Create `src/content/links/short-name.json`:

```json
{
  "title": "Article or page title",
  "url": "https://example.com/article",
  "description": "Why you saved it.",
  "tags": ["reading"],
  "date": "2025-02-01"
}
```

### New Book

Create `src/content/bookshelf/book-slug.json`:

```json
{
  "title": "Book Title",
  "author": "Author Name",
  "year": 1977,
  "status": "read",
  "rating": 4,
  "note": "A brief personal note.",
  "tags": ["philosophy"],
  "date": "2025-01-15"
}
```

`status` options: `"read"` | `"reading"` | `"want-to-read"`
`rating` is 1–5, optional.

---

## Using MDX

For writings or logs that need custom components, use `.mdx` extension instead of `.md`:

```mdx
---
title: A Post with Components
date: 2025-02-01
---

import MyComponent from '../../components/MyComponent.astro';

Regular **markdown** works fine here.

<MyComponent />
```

---

## Customization

### Typography

Fonts are loaded from Google Fonts in `src/styles/global.css`. Current stack:

- **Body text**: Lora (serif) — warm, readable, editorial
- **UI / labels**: DM Sans (sans-serif) — clean, neutral
- **Code**: JetBrains Mono

To change fonts, update the `@import` at the top of `global.css` and the
`fontFamily` values in `tailwind.config.mjs`.

### Colors

All colors use CSS variables in `global.css`:

```css
:root {
  --color-bg: #fafaf9;
  --color-surface: #f5f5f4;
  --color-border: #e7e5e4;
  --color-muted: #a8a29e;
  --color-text: #44403c;
  --color-heading: #1c1917;
  /* ... */
}
```

Change these to retheme the entire site.

### Navigation

Add or remove nav items in `src/lib/config.ts` under `nav`:

```ts
nav: [
  { label: 'Writings', href: '/writings' },
  { label: 'Notes', href: '/notes' },   // ← add new section
  // ...
],
```

---

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import the repo at [vercel.com](https://vercel.com)
3. Vercel auto-detects Astro — click Deploy
4. Set your custom domain in project settings

No configuration needed — `vercel.json` is included.

### Netlify

1. Push to GitHub
2. Import at [netlify.com](https://netlify.com)
3. Build command: `npm run build`, publish dir: `dist`
4. `netlify.toml` is included — it configures this automatically

### Cloudflare Pages

1. Push to GitHub
2. Create a new Pages project at [pages.cloudflare.com](https://pages.cloudflare.com)
3. Framework preset: Astro
4. Build command: `npm run build`, output dir: `dist`

### Manual (any static host)

```bash
npm run build
# Upload the dist/ folder to any static host
```

---

## Adding New Sections

To add a new section (e.g., `/notes`):

1. Add a collection schema in `src/content/config.ts`
2. Create `src/content/notes/` with your content files
3. Create `src/pages/notes/index.astro` (listing)
4. Create `src/pages/notes/[slug].astro` (individual pages)
5. Add to nav in `src/lib/config.ts`

The pattern is identical to `writings` and `logs` — copy and adapt.

---

## Performance

- Zero client-side JavaScript except dark mode toggle (~300 bytes) and reading progress bar (~200 bytes)
- Fonts loaded from Google Fonts with `display=swap`
- All pages statically generated at build time
- Typical page weight: < 50KB including fonts

---

## License

MIT — do whatever you like. Attribution appreciated but not required.
