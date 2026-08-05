-- ============================================================================
-- Surgical SEO update for the LIVE database.
--
-- Safe to run on your live Supabase project: it changes ONLY SEO / structured
-- data fields. It does NOT touch your page body content (the text, hero, or
-- blocks you perfected in the dashboard). Run it once in the Supabase SQL
-- Editor. Re-running it is harmless.
-- ============================================================================

-- 1) Homepage browser/Google title becomes just your name.
--    (Only the SEO title key is changed; the visible page is untouched.)
update public.pages
set seo = jsonb_set(coalesce(seo, '{}'::jsonb), '{title}',
      '{"en":"Amit Kochavi","he":"עמית כוכבי"}'::jsonb, true),
    updated_at = now()
where key = 'home';

-- 2) Connect your X and LinkedIn to the site so Google associates them with
--    you (Person.sameAs in the structured data). Preserves your profile photo
--    and every other identity field already saved.
update public.site_settings
set person_schema = jsonb_set(person_schema, '{sameAs}',
      '["https://x.com/AmitKochavi","https://www.linkedin.com/in/amitkochavi/"]'::jsonb, true),
    updated_at = now()
where id = 1;

-- 3) Keep the settings social-links list in sync (X + LinkedIn only).
update public.site_settings
set social_links = '[{"platform":"X","url":"https://x.com/AmitKochavi"},{"platform":"LinkedIn","url":"https://www.linkedin.com/in/amitkochavi/"}]'::jsonb,
    updated_at = now()
where id = 1;
