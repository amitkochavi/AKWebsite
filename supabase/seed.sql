-- ============================================================================
-- Seed: site content (auto-generated from src/lib/fallback-content.ts).
-- Run AFTER schema.sql. Safe to re-run: every row upserts (updates on conflict).
-- ============================================================================

insert into public.site_settings (id, site_name, tagline, contact_email, social_links, seo_defaults, person_schema) values
(1, $json${"en":"Amit Kochavi","he":"עמית כוכבי"}$json$, $json${"en":"Senior Advisor to the Mayor of Sderot | Entrepreneur | Socio-economic development and delivery","he":"יועץ בכיר לראש עיריית שדרות | יזם | ביצוע ופיתוח כלכלי-חברתי"}$json$, 'contact@amitkochavi.com', $json$[{"platform":"X","url":"https://x.com/AmitKochavi"}]$json$, $json${"title":{"en":"Amit Kochavi | Senior Advisor to the Mayor of Sderot","he":"עמית כוכבי | יועץ בכיר לראש עיריית שדרות"},"description":{"en":"Senior Advisor to the Mayor of Sderot, council member of the President's Voice of the People initiative, entrepreneur and founder of Starwell Holdings.","he":"יועץ בכיר לראש עיריית שדרות, חבר מועצת קול העם של נשיא המדינה, יזם ומייסד סטארוול הולדינגס."}}$json$, $json${"name":"Amit Kochavi","alternateName":["Amit L. Kochavi","Amit Lev Kochavi","עמית כוכבי","עמית לב כוכבי"],"jobTitle":{"en":"Senior Advisor to the Mayor of Sderot; Founder of Starwell Holdings","he":"יועץ בכיר לראש עיריית שדרות; מייסד סטארוול הולדינגס"},"description":{"en":"Senior Advisor to the Mayor of Sderot, council member of the President's Voice of the People initiative, entrepreneur and founder of Starwell Holdings.","he":"יועץ בכיר לראש עיריית שדרות, חבר מועצת קול העם של נשיא המדינה, יזם ומייסד סטארוול הולדינגס."},"sameAs":["https://x.com/AmitKochavi"],"worksFor":"Starwell Holdings","knowsAbout":["Public Service","Sderot","Entrepreneurship","Investment","Information Technology","Real Estate"]}$json$)
on conflict (id) do update set
  site_name = excluded.site_name,
  tagline = excluded.tagline,
  contact_email = excluded.contact_email,
  social_links = excluded.social_links,
  seo_defaults = excluded.seo_defaults,
  person_schema = excluded.person_schema,
  updated_at = now();

-- Pages
insert into public.pages (key, title, hero, blocks, seo, sort_order) values
('home', $json${"en":"Amit Kochavi","he":"עמית כוכבי"}$json$, $json${"title":{"en":"Amit Kochavi","he":"עמית כוכבי"},"subtitle":{"en":"Senior Advisor to the Mayor of Sderot | Entrepreneur | Socio-economic development and delivery","he":"יועץ בכיר לראש עיריית שדרות | יזם | ביצוע ופיתוח כלכלי-חברתי"},"cta_label":{"en":"","he":""},"cta_href":""}$json$, $json$[{"id":"home-pillars","type":"cards","heading":{"en":"Explore","he":"עוד"},"items":[{"title":{"en":"Public Service","he":"שירות ציבורי"},"body":{"en":"Senior Advisor to the Mayor of Sderot, working on the city's recovery since October 7th.","he":"יועץ בכיר לראש עיריית שדרות, בעבודה על שיקום העיר מאז השבעה באוקטובר."},"href":"/public-service"},{"title":{"en":"Business","he":"עסקים"},"body":{"en":"Founder of Starwell Holdings.","he":"מייסד סטארוול הולדינגס."},"href":"/business"},{"title":{"en":"Philanthropy","he":"פילנתרופיה"},"body":{"en":"Board member of the family's two foundations.","he":"חבר דירקטוריון בשתי קרנות המשפחה."},"href":"/philanthropy"}]}]$json$, $json${"title":{"en":"Amit Kochavi | Senior Advisor to the Mayor of Sderot","he":"עמית כוכבי | יועץ בכיר לראש עיריית שדרות"},"description":{"en":"Senior Advisor to the Mayor of Sderot, council member of the President's Voice of the People initiative, entrepreneur and founder of Starwell Holdings.","he":"יועץ בכיר לראש עיריית שדרות, חבר מועצת קול העם של נשיא המדינה, יזם ומייסד סטארוול הולדינגס."}}$json$, 0),
('about', $json${"en":"About","he":"אודות"}$json$, $json${"title":{"en":"About","he":"אודות"},"subtitle":{"en":"","he":""}}$json$, $json$[{"id":"about-bio","type":"text","body":{"en":"<p>Amit Kochavi, 28, is Senior Advisor to the Mayor of Sderot and a council member of the President's Voice of the People initiative. An entrepreneur, he is the founder of Starwell Holdings and serves on the boards of his family's foundations. [CONFIRM: closing sentence about where he lives, or omit]</p>","he":"<p>עמית כוכבי, 28, הוא יועץ בכיר לראש עיריית שדרות וחבר מועצת \"קול העם\" של נשיא המדינה. יזם ומייסד סטארוול הולדינגס, וחבר דירקטוריון בקרנות המשפחה. מתגורר בין שדרות לתל אביב. [CONFIRM: the last sentence, or delete it]</p>"}}]$json$, $json${}$json$, 1),
('public-service', $json${"en":"Public Service","he":"שירות ציבורי"}$json$, $json${"title":{"en":"Public Service","he":"שירות ציבורי"},"subtitle":{"en":"","he":""}}$json$, $json$[{"id":"ps-body","type":"text","body":{"en":"<p>Senior Advisor to Sderot Mayor Alon Davidi. Since October 7th, working with the Tkuma Directorate on the city's recovery and growth: the opening of the Rimon Music School, new kindergartens, a relocation program for tech families, and the advancement of a Sapir College technology campus, part of a strategic plan to double the city's population.</p>\n<p>Council member of Voice of the People, the initiative of President Isaac Herzog.</p>\n<p>Member of Aurion, the Next Generation Board of Governors of Tel Aviv University.</p>","he":"<p>יועץ בכיר לראש עיריית שדרות אלון דוידי. מאז השבעה באוקטובר, עבודה מול מינהלת תקומה על שיקום העיר וצמיחתה: פתיחת בית הספר למוסיקה רימון, גני ילדים חדשים, תוכנית קליטה למשפחות הייטק וקידום קמפוס טכנולוגי של מכללת ספיר, במסגרת תוכנית אסטרטגית להכפלת אוכלוסיית העיר.</p>\n<p>חבר מועצת המנהיגות של \"קול העם\", יוזמת נשיא המדינה יצחק הרצוג.</p>\n<p>חבר Aurion, דור ההמשך של חבר הנאמנים של אוניברסיטת תל אביב. [CONFIRM: exact Hebrew rendering of the program name]</p>"}}]$json$, $json${}$json$, 2),
('business', $json${"en":"Business","he":"עסקים"}$json$, $json${"title":{"en":"Business","he":"עסקים"},"subtitle":{"en":"","he":""}}$json$, $json$[{"id":"biz-body","type":"text","body":{"en":"<p>Founder of Starwell Holdings: a private group that builds and operates Israeli technology and IT services companies, alongside the family's real estate activity and investments.</p>","he":"<p>מייסד סטארוול הולדינגס: קבוצה פרטית הבונה ומפעילה חברות טכנולוגיה ושירותי IT בישראל, לצד המשך פעילות הנדל\"ן המשפחתית והשקעות.</p>"}}]$json$, $json${}$json$, 3),
('philanthropy', $json${"en":"Philanthropy","he":"פילנתרופיה"}$json$, $json${"title":{"en":"Philanthropy","he":"פילנתרופיה"},"subtitle":{"en":"","he":""}}$json$, $json$[{"id":"phil-body","type":"text","body":{"en":"<p>The family's giving is centered in two foundations: the Buchman Heyman Foundation, established by Sara Buchman in 1942, and the Herb and Sharon Glaser Foundation. [CONFIRM: focus areas line]</p>\n<p>Amit serves on the board of both foundations. [CONFIRM: exact role titles]</p>","he":"<p>פעילות הנתינה של המשפחה מרוכזת בשתי קרנות: קרן בוכמן-היימן, שהוקמה בידי שרה בוכמן בשנת 1942, וקרן הרברט ושרון גלייזר. [CONFIRM: Hebrew spelling of Glaser; note that \"Herb\" must be rendered הרברט, never הרב] [CONFIRM: one line on focus areas, e.g. education and community, only if publicly stated]</p>\n<p>עמית מכהן כחבר דירקטוריון בשתי הקרנות. [CONFIRM: exact role titles]</p>"}}]$json$, $json${}$json$, 4),
('contact', $json${"en":"Contact","he":"צור קשר"}$json$, $json${"title":{"en":"Contact","he":"צור קשר"},"subtitle":{"en":"","he":""}}$json$, $json$[]$json$, $json${}$json$, 5)
on conflict (key) do update set
  title = excluded.title,
  hero = excluded.hero,
  blocks = excluded.blocks,
  seo = excluded.seo,
  sort_order = excluded.sort_order,
  updated_at = now();

-- Media (books on /books, press/coverage on /media)
insert into public.media_items (slug, kind, title, excerpt, body, cover_image, external_url, published_at, sort_order) values
('forward-oct7-sderot', 'writing', $json${"en":"Oct. 7, Israel's recovery, and the rebuilding of Sderot","he":"על שיקום שדרות והיום שאחרי"}$json$, $json${"en":"The Forward","he":"The Forward (אנגלית)"}$json$, $json${"en":"","he":""}$json$, null, 'https://forward.com/opinion/659484/oct-7-israel-recovery-sderot/', null, 0),
('walla-rimon-music-school', 'press', $json${"en":"Sderot's Rimon Music School","he":"בית הספר למוסיקה רימון"}$json$, $json${"en":"Walla Finance","he":"וואלה כסף"}$json$, $json${"en":"","he":""}$json$, null, 'https://finance.walla.co.il/item/3732149', null, 1),
('shoe-dog', 'reading', $json${"en":"Shoe Dog","he":"Shoe Dog"}$json$, $json${"en":"Phil Knight","he":"Phil Knight"}$json$, $json${"en":"","he":""}$json$, null, null, null, 0),
('my-life', 'reading', $json${"en":"My Life","he":"My Life"}$json$, $json${"en":"Bill Clinton","he":"Bill Clinton"}$json$, $json${"en":"","he":""}$json$, null, null, null, 1),
('elon-musk', 'reading', $json${"en":"Elon Musk","he":"Elon Musk"}$json$, $json${"en":"Walter Isaacson","he":"Walter Isaacson"}$json$, $json${"en":"","he":""}$json$, null, null, null, 2),
('what-it-takes', 'reading', $json${"en":"What It Takes","he":"What It Takes"}$json$, $json${"en":"Stephen A. Schwarzman","he":"Stephen A. Schwarzman"}$json$, $json${"en":"","he":""}$json$, null, null, null, 3),
('embracing-defeat', 'reading', $json${"en":"Embracing Defeat","he":"Embracing Defeat"}$json$, $json${"en":"John W. Dower","he":"John W. Dower"}$json$, $json${"en":"","he":""}$json$, null, null, null, 4),
('the-alchemist', 'reading', $json${"en":"The Alchemist","he":"The Alchemist"}$json$, $json${"en":"Paulo Coelho","he":"Paulo Coelho"}$json$, $json${"en":"","he":""}$json$, null, null, null, 5),
('principles', 'reading', $json${"en":"Principles","he":"Principles"}$json$, $json${"en":"Ray Dalio","he":"Ray Dalio"}$json$, $json${"en":"","he":""}$json$, null, null, null, 6),
('how-to-make-a-few-billion-dollars', 'reading', $json${"en":"How to Make a Few Billion Dollars","he":"How to Make a Few Billion Dollars"}$json$, $json${"en":"Brad Jacobs","he":"Brad Jacobs"}$json$, $json${"en":"","he":""}$json$, null, null, null, 7),
('fall-in-love-with-the-problem', 'reading', $json${"en":"Fall in Love with the Problem, Not the Solution","he":"Fall in Love with the Problem, Not the Solution"}$json$, $json${"en":"Uri Levine","he":"Uri Levine"}$json$, $json${"en":"","he":""}$json$, null, null, null, 8),
('the-challenger-sale', 'reading', $json${"en":"The Challenger Sale","he":"The Challenger Sale"}$json$, $json${"en":"Brent Adamson & Matthew Dixon","he":"Brent Adamson & Matthew Dixon"}$json$, $json${"en":"","he":""}$json$, null, null, null, 9),
('the-ride-of-a-lifetime', 'reading', $json${"en":"The Ride of a Lifetime","he":"The Ride of a Lifetime"}$json$, $json${"en":"Bob Iger","he":"Bob Iger"}$json$, $json${"en":"","he":""}$json$, null, null, null, 10),
('thinking-fast-and-slow', 'reading', $json${"en":"Thinking, Fast and Slow","he":"Thinking, Fast and Slow"}$json$, $json${"en":"Daniel Kahneman","he":"Daniel Kahneman"}$json$, $json${"en":"","he":""}$json$, null, null, null, 11),
('bloomberg-by-bloomberg', 'reading', $json${"en":"Bloomberg by Bloomberg","he":"Bloomberg by Bloomberg"}$json$, $json${"en":"Mike Bloomberg","he":"Mike Bloomberg"}$json$, $json${"en":"","he":""}$json$, null, null, null, 12)
on conflict (slug) do update set
  kind = excluded.kind,
  title = excluded.title,
  excerpt = excluded.excerpt,
  body = excluded.body,
  cover_image = excluded.cover_image,
  external_url = excluded.external_url,
  published_at = excluded.published_at,
  sort_order = excluded.sort_order,
  updated_at = now();
