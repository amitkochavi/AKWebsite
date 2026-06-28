# Amit Kochavi — Personal Website

A bilingual (English / Hebrew) personal website for **Amit Kochavi** built with
**Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. It covers three
pillars — **Business career**, **Philanthropy** (fourth generation), and
**Public Service** (Sderot) — and ships with a password-protected **content
dashboard** and world-class SEO.

## Features

- **Bilingual & RTL** — full English (`/en`) and Hebrew (`/he`) sites, with the
  Hebrew side rendered right-to-left. A language switcher swaps between the same
  page in either language.
- **SEO built for "Amit Kochavi" / "Amit L. Kochavi" searches**
  - Server-rendered metadata, canonical URLs, and `hreflang` alternates (`en`,
    `he`, `x-default`) on every page.
  - **Structured data (JSON-LD):** `Person` (with `alternateName` for *Amit L.
    Kochavi*), `WebSite` (with sitelinks SearchAction), `BreadcrumbList`, and
    `Article` — the signals Google uses to build a knowledge panel and the
    **sitelinks** shown under your main result.
  - `sitemap.xml` (both languages + news posts), `robots.txt`, web manifest, and
    an auto-generated Open Graph image.
  - Clear, crawlable navigation and an HTML `/sitemap` page so Google can
    surface sub-page sitelinks.
- **Content dashboard** at `/admin` — sign in and edit every section of the site
  (in both languages), manage News posts, and read contact-form submissions.
  Edits are saved instantly; no redeploy required.
- **Contact form** that stores submissions for review in the dashboard.

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit the values
npm run dev                  # http://localhost:3000
```

For a production build:

```bash
npm run build
npm run start
```

## Environment variables

| Variable         | Purpose                                                        |
| ---------------- | ------------------------------------------------------------- |
| `ADMIN_PASSWORD` | Password to sign in to the `/admin` content dashboard.        |
| `ADMIN_SECRET`   | Long random string used to sign the admin session cookie.     |

Set these in `.env.local` for local development and in your host's environment
settings for production. **Always change them from the defaults before going
live.**

## Content management

- Public-facing default content lives in `content/en.json` and `content/he.json`
  (committed to the repo).
- When you edit content in the dashboard, an overlay is written to
  `data/<locale>.json` and used in preference to the defaults. The `data/`
  overlay files are git-ignored, so a stateful host keeps live edits while the
  repo keeps the shipped defaults. Use **Reset** in the dashboard to revert a
  language to its committed default.

> Note: because edits persist to the filesystem, deploy to a **stateful Node
> host** (a VM, container, or platform with a persistent volume) running
> `npm run start`. On read-only/serverless filesystems the site still renders
> perfectly from the committed defaults, but dashboard edits won't persist — in
> that case, edit `content/*.json` and redeploy, or attach a volume.

## Project structure

```
app/
  [locale]/            # All public pages (home, business, philanthropy,
                       # public-service, news, contact, sitemap)
  admin/               # Dashboard (login + editor)
  api/                 # Auth, content, messages, and contact endpoints
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx
components/            # Header, Footer, JSON-LD, forms, dashboard UI
content/               # Committed default content (en/he)
lib/                   # i18n, content store, auth, types
middleware.ts          # Locale routing + per-request locale header
```

## SEO go-live checklist

1. Point the domain to the deployment and confirm `https://amitkochavi.com`
   resolves (the canonical/sitemap URLs assume this domain — update the
   `metadataBase` and `BASE`/`SITE_URL` constants if it changes).
2. Verify the property in **Google Search Console** and submit
   `https://amitkochavi.com/sitemap.xml`.
3. Test a page in Google's **Rich Results Test** to confirm the `Person` and
   `WebSite` structured data is detected.
4. Add real photography and replace the placeholder copy via the dashboard.
5. Link the site from your verified social/professional profiles to build the
   `Person` entity (add their URLs to `sameAs` in `components/JsonLd.tsx`).
