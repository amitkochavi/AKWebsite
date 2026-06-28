-- ============================================================================
-- Amit Kochavi website — database schema, RLS, and storage.
-- Run this once in the Supabase SQL editor for your project.
-- Bilingual content is stored as JSONB: { "en": "...", "he": "..." }.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ── Tables ──────────────────────────────────────────────────────────────────

create table if not exists public.site_settings (
  id            int primary key default 1,
  site_name     jsonb not null default '{"en":"Amit Kochavi","he":"עמית כוכבי"}',
  tagline       jsonb not null default '{"en":"","he":""}',
  contact_email text,
  social_links  jsonb not null default '[]',
  seo_defaults  jsonb not null default '{}',
  person_schema jsonb not null default '{}',
  updated_at    timestamptz not null default now(),
  constraint single_row check (id = 1)
);

create table if not exists public.pages (
  key          text primary key,   -- home|about|business|philanthropy|public-service|contact
  title        jsonb not null default '{"en":"","he":""}',
  hero         jsonb not null default '{}',
  blocks       jsonb not null default '[]',
  seo          jsonb not null default '{}',
  is_published boolean not null default true,
  sort_order   int not null default 0,
  updated_at   timestamptz not null default now()
);

create table if not exists public.media_items (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  kind         text not null default 'article',  -- article|press|video|reading|writing
  title        jsonb not null default '{"en":"","he":""}',
  excerpt      jsonb not null default '{"en":"","he":""}',
  body         jsonb not null default '{"en":"","he":""}',
  cover_image  text,
  external_url text,
  published_at date,
  is_published boolean not null default true,
  sort_order   int not null default 0,
  seo          jsonb not null default '{}',
  updated_at   timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text,
  email      text,
  message    text,
  locale     text,
  created_at timestamptz not null default now()
);

create index if not exists media_published_idx
  on public.media_items (is_published, published_at desc);
create index if not exists pages_published_idx
  on public.pages (is_published, sort_order);

-- ── Row Level Security ───────────────────────────────────────────────────────
-- Public can read published content. Only authenticated admins can write.

alter table public.site_settings    enable row level security;
alter table public.pages            enable row level security;
alter table public.media_items      enable row level security;
alter table public.contact_messages enable row level security;

-- Public read
create policy "public read settings" on public.site_settings
  for select using (true);
create policy "public read published pages" on public.pages
  for select using (is_published = true);
create policy "public read published media" on public.media_items
  for select using (is_published = true);

-- Admin (authenticated) full access
create policy "admin all settings" on public.site_settings
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
create policy "admin all pages" on public.pages
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
create policy "admin all media" on public.media_items
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Contact form: anyone may submit; only admins may read
create policy "anon insert contact" on public.contact_messages
  for insert with check (true);
create policy "admin read contact" on public.contact_messages
  for select using (auth.role() = 'authenticated');

-- ── Storage (image uploads) ──────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
  values ('media', 'media', true)
  on conflict (id) do nothing;

create policy "public read media bucket" on storage.objects
  for select using (bucket_id = 'media');
create policy "admin write media bucket" on storage.objects
  for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "admin update media bucket" on storage.objects
  for update using (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "admin delete media bucket" on storage.objects
  for delete using (bucket_id = 'media' and auth.role() = 'authenticated');
