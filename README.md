# Amit Kochavi — Website & Content Dashboard

The official bilingual (English / Hebrew) website for **Amit Kochavi**, with a
built-in, password-protected dashboard for managing all content live.

It presents three pillars — **Business career**, **Philanthropy (4th
generation)**, and **Public Service (Sderot)** — alongside About, Media &
Writing, and Contact, and is engineered for strong search performance on
searches like *"Amit Kochavi"* and *"Amit L. Kochavi"* in both languages.

---

## Features

- **Bilingual** English (default) + Hebrew with full **right-to-left** support
  and a language switcher. Both languages are indexed via `hreflang`.
- **Content dashboard** at `/admin` — edit every page, section, article, and
  setting in both languages. Changes go live within ~1 minute, no redeploy.
- **SEO-first**: server-rendered pages, per-page metadata, canonical +
  `hreflang` alternates, OpenGraph/Twitter cards, JSON-LD (`Person`,
  `WebSite`, `BreadcrumbList`, `Article`), dynamic `sitemap.xml`, `robots.txt`,
  and a clean, stable navigation structure to maximise Google **sitelinks**.
- **Fast & accessible**: static rendering with on-demand revalidation, semantic
  HTML, optimized images.

## Tech stack

- **Next.js 15** (App Router, TypeScript) + **React 19**
- **Tailwind CSS v4**
- **next-intl** for i18n routing & RTL
- **Supabase** — Postgres (content), Auth (admin login), Storage (images)
- **Tiptap** rich-text editor in the dashboard
- Hosted on **Netlify** (`@netlify/plugin-nextjs`)

> The site runs with bundled placeholder content even before Supabase is
> configured, so you can develop and preview immediately. Once Supabase is
> connected, dashboard content takes over.

---

## Local development

```bash
npm install
cp .env.example .env.local   # fill in values (see below); optional for first run
npm run dev                  # http://localhost:3000  → redirects to /en
```

Without Supabase env vars the public site shows bundled bilingual content and
`/admin` shows a "configure Supabase" notice.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com) (a region near
   Israel / the EU is ideal).
2. In **SQL Editor**, run `supabase/schema.sql` (tables, RLS, storage), then
   `supabase/seed.sql` (bilingual placeholder content). Both are safe to re-run.
3. Create your admin user: **Authentication → Users → Add user** (email +
   password). Then **Authentication → Providers → Email** and disable public
   sign-ups so only you can log in.
4. Copy your keys from **Project Settings → API**: the Project URL, the `anon`
   public key, and the `service_role` key.

## Environment variables

Set these in `.env.local` (development) and in Netlify (production):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (read-only via RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key — **never** expose to the client |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, e.g. `https://amitkochavi.com` |
| `REVALIDATE_SECRET` | Long random string for the manual revalidate endpoint |

## Deploy to Netlify

1. Push this repo and connect it in Netlify ("Add new site → Import").
2. Netlify auto-detects Next.js and installs `@netlify/plugin-nextjs`
   (also declared in `netlify.toml`). Build command `npm run build`.
3. Add the environment variables above in **Site settings → Environment**.
4. Add your custom domain. Pick the **apex** `amitkochavi.com` as primary and
   set a 301 redirect from `www` (or vice-versa) — one canonical host helps SEO.
   Enable HTTPS.
5. After launch: verify the domain in **Google Search Console** and submit
   `https://amitkochavi.com/sitemap.xml`.

---

## Using the dashboard

Go to `/admin`, sign in, and edit:

- **Pages** — the homepage and each section page: hero, content blocks (text,
  cards, statistics, quote, image), and per-page SEO overrides. Each text field
  has side-by-side **English** and **Hebrew** inputs.
- **Media & Writing** — create/edit articles, press, and writing with a
  rich-text body, cover image, external link, and publish toggle.
- **Site Settings** — name, tagline, contact email, social links, SEO defaults,
  and the **search identity** (JSON-LD `Person`) that tells Google who the site
  is about — important for ranking on the name.

Saving writes to Supabase and revalidates the affected public pages, so updates
appear within about a minute.

> **About Google sitelinks:** the indented sub-links under a search result are
> awarded by Google, not configured directly. This site maximises the chances
> with a single canonical domain, a clean and stable top-level navigation,
> strong internal linking, a complete sitemap, and structured data.

## Project structure

```
src/
  app/
    (site)/[locale]/        # public, localized pages (en/he)
    (dashboard)/admin/      # dashboard (login + protected panel)
    api/                    # contact + revalidate route handlers
    sitemap.ts robots.ts manifest.ts icon.svg
  components/{layout,sections,seo,admin,ui}/
  lib/{supabase, content, admin-data, seo, i18n, constants}.ts
  actions/content-actions.ts   # server actions (auth-checked writes)
  i18n/ messages/ types/
  middleware.ts             # i18n + Supabase session + /admin guard
supabase/{schema.sql, seed.sql}
netlify.toml  next.config.ts
```

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build
npm run start    # run the production build
npm run lint     # eslint
npm run format   # prettier
```
