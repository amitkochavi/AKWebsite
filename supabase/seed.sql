-- ============================================================================
-- Seed: professional bilingual placeholder content.
-- Run AFTER schema.sql. Safe to re-run (uses upserts).
-- Dollar-quoted ($json$ … $json$) literals avoid any quote escaping.
-- The owner can refine all of this in the dashboard.
-- ============================================================================

-- ── Site settings ────────────────────────────────────────────────────────────
insert into public.site_settings (id, site_name, tagline, contact_email, social_links, seo_defaults, person_schema)
values (
  1,
  $json${"en":"Amit Kochavi","he":"עמית כוכבי"}$json$,
  $json${"en":"Business. Philanthropy. Public Service.","he":"עסקים. פילנתרופיה. שירות ציבורי."}$json$,
  'office@amitkochavi.com',
  $json$[{"platform":"LinkedIn","url":"https://www.linkedin.com/in/amitkochavi"},{"platform":"X","url":"https://x.com/amitkochavi"}]$json$,
  $json${"title":{"en":"Amit Kochavi — Business, Philanthropy & Public Service","he":"עמית כוכבי — עסקים, פילנתרופיה ושירות ציבורי"},"description":{"en":"The official website of Amit L. Kochavi — entrepreneur and business leader, fourth-generation philanthropist, and public servant committed to the people of Sderot and the Negev.","he":"האתר הרשמי של עמית כוכבי — יזם ומנהיג עסקי, פילנתרופ מהדור הרביעי ואיש ציבור המחויב לתושבי שדרות והנגב."}}$json$,
  $json${"name":"Amit Kochavi","alternateName":["Amit L. Kochavi","עמית כוכבי"],"jobTitle":{"en":"Entrepreneur & Public Servant","he":"יזם ואיש ציבור"},"description":{"en":"Amit Kochavi is an entrepreneur and business leader, a fourth-generation philanthropist, and a public servant dedicated to strengthening Sderot and the communities of southern Israel.","he":"עמית כוכבי הוא יזם ומנהיג עסקי, פילנתרופ מהדור הרביעי ואיש ציבור המחויב לחיזוק שדרות וקהילות הדרום."},"sameAs":["https://www.linkedin.com/in/amitkochavi","https://x.com/amitkochavi"],"knowsAbout":["Entrepreneurship","Investment","Philanthropy","Public Service","Community Development","Sderot"]}$json$
)
on conflict (id) do update set
  site_name = excluded.site_name,
  tagline = excluded.tagline,
  contact_email = excluded.contact_email,
  social_links = excluded.social_links,
  seo_defaults = excluded.seo_defaults,
  person_schema = excluded.person_schema;

-- ── Pages ────────────────────────────────────────────────────────────────────
insert into public.pages (key, title, hero, blocks, sort_order) values
(
  'home',
  $json${"en":"Amit Kochavi","he":"עמית כוכבי"}$json$,
  $json${"title":{"en":"Amit Kochavi","he":"עמית כוכבי"},"subtitle":{"en":"Building enterprises, continuing a family legacy of giving, and serving the people of Sderot.","he":"בונה מפעלים, ממשיך מורשת משפחתית של נתינה, ומשרת את תושבי שדרות."},"cta_label":{"en":"Learn more","he":"מידע נוסף"},"cta_href":"/about"}$json$,
  $json$[{"id":"home-intro","type":"text","heading":{"en":"A life across three commitments","he":"חיים של שלוש מחויבויות"},"body":{"en":"Amit Kochavi’s work spans the worlds of business, philanthropy, and public service. Each reinforces the others — enterprise that creates opportunity, giving that strengthens community, and service that puts people first.","he":"פועלו של עמית כוכבי משתרע על פני עולמות העסקים, הפילנתרופיה והשירות הציבורי. כל אחד מהם מחזק את האחרים — יזמות שיוצרת הזדמנות, נתינה שמחזקת קהילה, ושירות ששם את האדם במרכז."}},{"id":"home-pillars","type":"cards","heading":{"en":"Explore","he":"גלו עוד"},"items":[{"title":{"en":"Business","he":"עסקים"},"body":{"en":"A career building and backing companies that create lasting value and jobs.","he":"קריירה של בנייה וגיבוי חברות שיוצרות ערך ותעסוקה לאורך זמן."},"href":"/business"},{"title":{"en":"Philanthropy","he":"פילנתרופיה"},"body":{"en":"A fourth-generation tradition of giving, invested in people and community.","he":"מסורת נתינה מהדור הרביעי, המושקעת באנשים ובקהילה."},"href":"/philanthropy"},{"title":{"en":"Public Service","he":"שירות ציבורי"},"body":{"en":"Standing with Sderot and the Negev — resilience, recovery, and growth.","he":"עומד לצד שדרות והנגב — חוסן, שיקום וצמיחה."},"href":"/public-service"}]}]$json$,
  0
),
(
  'about',
  $json${"en":"About","he":"אודות"}$json$,
  $json${"title":{"en":"About Amit Kochavi","he":"אודות עמית כוכבי"},"subtitle":{"en":"Entrepreneur, philanthropist, and public servant.","he":"יזם, פילנתרופ ואיש ציבור."}}$json$,
  $json$[{"id":"about-bio","type":"text","heading":{"en":"Biography","he":"ביוגרפיה"},"body":{"en":"Amit L. Kochavi is an entrepreneur and business leader whose career bridges enterprise, philanthropy, and public service. He builds and supports companies that create opportunity, continues a family tradition of giving that now spans four generations, and devotes himself to the people of Sderot and southern Israel.","he":"עמית כוכבי הוא יזם ומנהיג עסקי שהקריירה שלו מגשרת בין יזמות, פילנתרופיה ושירות ציבורי. הוא בונה ותומך בחברות היוצרות הזדמנות, ממשיך מסורת משפחתית של נתינה המשתרעת על פני ארבעה דורות, ומקדיש את עצמו לתושבי שדרות ודרום הארץ."}},{"id":"about-values","type":"quote","body":{"en":"I believe that the measure of success is not only what you build, but who you lift along the way.","he":"אני מאמין שמדד ההצלחה אינו רק במה שאתה בונה, אלא במי שאתה מרים יחד איתך בדרך."},"attribution":{"en":"Amit Kochavi","he":"עמית כוכבי"}}]$json$,
  1
),
(
  'business',
  $json${"en":"Business","he":"עסקים"}$json$,
  $json${"title":{"en":"Business Career","he":"קריירה עסקית"},"subtitle":{"en":"Building and backing companies that create lasting value.","he":"בנייה וגיבוי חברות שיוצרות ערך לאורך זמן."}}$json$,
  $json$[{"id":"biz-overview","type":"text","heading":{"en":"An entrepreneur’s path","he":"דרכו של יזם"},"body":{"en":"Across more than two decades, Amit Kochavi has founded, led, and invested in businesses spanning technology, real estate, and growth-stage enterprise. His approach pairs long-term vision with operational discipline — building companies designed to endure and to create meaningful employment.","he":"במשך למעלה משני עשורים ייסד עמית כוכבי, הוביל והשקיע בעסקים בתחומי הטכנולוגיה, הנדל\"ן וחברות בצמיחה. גישתו משלבת חזון ארוך-טווח עם משמעת תפעולית — בניית חברות שנועדו להתמיד וליצור תעסוקה משמעותית."}},{"id":"biz-stats","type":"stat","items":[{"value":{"en":"20+","he":"20+"},"label":{"en":"Years in business","he":"שנות פעילות עסקית"}},{"value":{"en":"Multiple","he":"מספר"},"label":{"en":"Companies founded & backed","he":"חברות שהוקמו וגובו"}},{"value":{"en":"Long-term","he":"ארוך-טווח"},"label":{"en":"Investment horizon","he":"אופק השקעה"}}]},{"id":"biz-approach","type":"text","heading":{"en":"Philosophy","he":"פילוסופיה"},"body":{"en":"Credibility, patience, and partnership define how Amit works. He invests in people first, builds trust over years, and measures returns not only in capital but in the opportunity and stability his ventures create.","he":"אמינות, סבלנות ושותפות מאפיינות את דרכו של עמית. הוא משקיע קודם כל באנשים, בונה אמון לאורך שנים, ומודד תשואה לא רק בהון אלא גם בהזדמנות וביציבות שמיזמיו יוצרים."}}]$json$,
  2
),
(
  'philanthropy',
  $json${"en":"Philanthropy","he":"פילנתרופיה"}$json$,
  $json${"title":{"en":"Philanthropy","he":"פילנתרופיה"},"subtitle":{"en":"A fourth-generation tradition of giving.","he":"מסורת נתינה מהדור הרביעי."}}$json$,
  $json$[{"id":"phil-legacy","type":"text","heading":{"en":"Four generations of giving","he":"ארבעה דורות של נתינה"},"body":{"en":"Philanthropy is, for Amit Kochavi, an inheritance and a responsibility. As a fourth-generation philanthropist, he carries forward a family legacy in which giving is not an occasional act but a way of life — directed toward education, community resilience, and opportunity for the next generation.","he":"עבור עמית כוכבי, הפילנתרופיה היא ירושה ואחריות כאחד. כפילנתרופ מהדור הרביעי, הוא ממשיך מורשת משפחתית שבה הנתינה אינה מעשה מזדמן אלא דרך חיים — המכוונת לחינוך, לחוסן קהילתי ולהזדמנות עבור הדור הבא."}},{"id":"phil-focus","type":"cards","heading":{"en":"Areas of focus","he":"תחומי מיקוד"},"items":[{"title":{"en":"Education","he":"חינוך"},"body":{"en":"Scholarships and programs that open doors for young people.","he":"מלגות ותכניות שפותחות דלתות לצעירים."}},{"title":{"en":"Community","he":"קהילה"},"body":{"en":"Strengthening the social fabric of southern Israel.","he":"חיזוק המרקם החברתי של דרום הארץ."}},{"title":{"en":"Resilience","he":"חוסן"},"body":{"en":"Supporting families and institutions in times of need.","he":"תמיכה במשפחות ובמוסדות בעת צרה."}}]}]$json$,
  3
),
(
  'public-service',
  $json${"en":"Public Service","he":"שירות ציבורי"}$json$,
  $json${"title":{"en":"Public Service in Sderot","he":"שירות ציבורי בשדרות"},"subtitle":{"en":"Standing with the people of Sderot and the Negev.","he":"עומד לצד תושבי שדרות והנגב."}}$json$,
  $json$[{"id":"ps-sderot","type":"text","heading":{"en":"A commitment to Sderot","he":"מחויבות לשדרות"},"body":{"en":"Public service, for Amit Kochavi, begins close to home. He has dedicated himself to the people of Sderot — a community known for its extraordinary resilience — working to advance recovery, security, education, and long-term growth so that residents can build their futures with confidence.","he":"השירות הציבורי, עבור עמית כוכבי, מתחיל קרוב לבית. הוא הקדיש את עצמו לתושבי שדרות — קהילה הידועה בחוסנה יוצא הדופן — ופועל לקידום שיקום, ביטחון, חינוך וצמיחה ארוכת-טווח, כדי שהתושבים יוכלו לבנות את עתידם מתוך ביטחון."}},{"id":"ps-initiatives","type":"cards","heading":{"en":"Where the work focuses","he":"במה מתמקד הפועל"},"items":[{"title":{"en":"Recovery & Resilience","he":"שיקום וחוסן"},"body":{"en":"Helping the city and its residents rebuild and thrive.","he":"סיוע לעיר ולתושביה להשתקם ולשגשג."}},{"title":{"en":"Youth & Education","he":"נוער וחינוך"},"body":{"en":"Investing in the next generation of Sderot’s leaders.","he":"השקעה בדור הבא של מנהיגי שדרות."}},{"title":{"en":"Community","he":"קהילה"},"body":{"en":"Programs that bring people together and create opportunity.","he":"תכניות שמקרבות בין אנשים ויוצרות הזדמנות."}}]}]$json$,
  4
),
(
  'contact',
  $json${"en":"Contact","he":"צור קשר"}$json$,
  $json${"title":{"en":"Get in touch","he":"יצירת קשר"},"subtitle":{"en":"For media, speaking, and partnership enquiries.","he":"לפניות תקשורת, הרצאות ושיתופי פעולה."}}$json$,
  $json$[{"id":"contact-intro","type":"text","body":{"en":"Please use the form below or reach out by email. Messages are reviewed by Amit Kochavi’s office.","he":"ניתן להשתמש בטופס שלהלן או לפנות בדוא\"ל. ההודעות מטופלות על ידי משרדו של עמית כוכבי."}}]$json$,
  5
)
on conflict (key) do nothing;

-- ── Media & writing ──────────────────────────────────────────────────────────
insert into public.media_items (slug, kind, title, excerpt, body, published_at, sort_order) values
(
  'building-for-the-long-term', 'article',
  $json${"en":"Building for the Long Term","he":"לבנות לטווח הארוך"}$json$,
  $json${"en":"Why patient capital and people-first leadership create companies that last.","he":"מדוע הון סבלני ומנהיגות שמציבה אנשים במרכז יוצרים חברות שמתמידות."}$json$,
  $json${"en":"An essay on the principles behind two decades of entrepreneurship — and why credibility compounds.","he":"מאמר על העקרונות שמאחורי שני עשורים של יזמות — ומדוע אמינות צוברת ערך עם הזמן."}$json$,
  '2026-01-15', 0
),
(
  'standing-with-sderot', 'writing',
  $json${"en":"Standing With Sderot","he":"עומדים עם שדרות"}$json$,
  $json${"en":"On resilience, recovery, and the responsibility to invest in community.","he":"על חוסן, שיקום והאחריות להשקיע בקהילה."}$json$,
  $json${"en":"Reflections on what it means to serve the place you call home.","he":"הרהורים על משמעות השירות למקום שאתה קורא לו בית."}$json$,
  '2026-02-20', 1
),
(
  'a-family-legacy-of-giving', 'press',
  $json${"en":"A Family Legacy of Giving","he":"מורשת משפחתית של נתינה"}$json$,
  $json${"en":"How four generations shaped a philosophy of philanthropy.","he":"כיצד ארבעה דורות עיצבו תפיסת פילנתרופיה."}$json$,
  $json${"en":"A profile of the values passed down through a fourth-generation philanthropist.","he":"פרופיל של הערכים שעברו מדור לדור אצל פילנתרופ מהדור הרביעי."}$json$,
  '2026-03-10', 2
)
on conflict (slug) do nothing;
