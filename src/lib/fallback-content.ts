import type { MediaItem, Page, PageKey, SiteSettings } from "@/types/content";

/**
 * Bundled default content. Used as a fallback when Supabase is not yet
 * configured (e.g. local dev before env vars are set, or build time) and as
 * the source for `supabase/seed.sql`. Once Supabase is connected, live
 * dashboard content takes precedence.
 *
 * All copy is professional placeholder text in English + Hebrew that the
 * owner can refine in the dashboard.
 */

export const FALLBACK_SETTINGS: SiteSettings = {
  site_name: { en: "Amit Kochavi", he: "עמית כוכבי" },
  tagline: {
    en: "Business. Philanthropy. Public Service.",
    he: "עסקים. פילנתרופיה. שירות ציבורי.",
  },
  contact_email: "office@amitkochavi.com",
  social_links: [
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/amitkochavi" },
    { platform: "X", url: "https://x.com/amitkochavi" },
  ],
  seo_defaults: {
    title: {
      en: "Amit Kochavi — Business, Philanthropy & Public Service",
      he: "עמית כוכבי — עסקים, פילנתרופיה ושירות ציבורי",
    },
    description: {
      en: "The official website of Amit L. Kochavi — entrepreneur and business leader, fourth-generation philanthropist, and public servant committed to the people of Sderot and the Negev.",
      he: "האתר הרשמי של עמית כוכבי — יזם ומנהיג עסקי, פילנתרופ מהדור הרביעי ואיש ציבור המחויב לתושבי שדרות והנגב.",
    },
  },
  person_schema: {
    name: "Amit Kochavi",
    alternateName: ["Amit L. Kochavi", "עמית כוכבי"],
    jobTitle: { en: "Entrepreneur & Public Servant", he: "יזם ואיש ציבור" },
    description: {
      en: "Amit Kochavi is an entrepreneur and business leader, a fourth-generation philanthropist, and a public servant dedicated to strengthening Sderot and the communities of southern Israel.",
      he: "עמית כוכבי הוא יזם ומנהיג עסקי, פילנתרופ מהדור הרביעי ואיש ציבור המחויב לחיזוק שדרות וקהילות הדרום.",
    },
    sameAs: [
      "https://www.linkedin.com/in/amitkochavi",
      "https://x.com/amitkochavi",
    ],
    knowsAbout: [
      "Entrepreneurship",
      "Investment",
      "Philanthropy",
      "Public Service",
      "Community Development",
      "Sderot",
    ],
  },
};

export const FALLBACK_PAGES: Record<PageKey, Page> = {
  home: {
    key: "home",
    title: { en: "Amit Kochavi", he: "עמית כוכבי" },
    hero: {
      title: { en: "Amit Kochavi", he: "עמית כוכבי" },
      subtitle: {
        en: "Building enterprises, continuing a family legacy of giving, and serving the people of Sderot.",
        he: "בונה מפעלים, ממשיך מורשת משפחתית של נתינה, ומשרת את תושבי שדרות.",
      },
      cta_label: { en: "Learn more", he: "מידע נוסף" },
      cta_href: "/about",
    },
    blocks: [
      {
        id: "home-intro",
        type: "text",
        heading: { en: "A life across three commitments", he: "חיים של שלוש מחויבויות" },
        body: {
          en: "Amit Kochavi’s work spans the worlds of business, philanthropy, and public service. Each reinforces the others — enterprise that creates opportunity, giving that strengthens community, and service that puts people first.",
          he: "פועלו של עמית כוכבי משתרע על פני עולמות העסקים, הפילנתרופיה והשירות הציבורי. כל אחד מהם מחזק את האחרים — יזמות שיוצרת הזדמנות, נתינה שמחזקת קהילה, ושירות ששם את האדם במרכז.",
        },
      },
      {
        id: "home-pillars",
        type: "cards",
        heading: { en: "Explore", he: "גלו עוד" },
        items: [
          {
            title: { en: "Business", he: "עסקים" },
            body: {
              en: "A career building and backing companies that create lasting value and jobs.",
              he: "קריירה של בנייה וגיבוי חברות שיוצרות ערך ותעסוקה לאורך זמן.",
            },
            href: "/business",
          },
          {
            title: { en: "Philanthropy", he: "פילנתרופיה" },
            body: {
              en: "A fourth-generation tradition of giving, invested in people and community.",
              he: "מסורת נתינה מהדור הרביעי, המושקעת באנשים ובקהילה.",
            },
            href: "/philanthropy",
          },
          {
            title: { en: "Public Service", he: "שירות ציבורי" },
            body: {
              en: "Standing with Sderot and the Negev — resilience, recovery, and growth.",
              he: "עומד לצד שדרות והנגב — חוסן, שיקום וצמיחה.",
            },
            href: "/public-service",
          },
        ],
      },
    ],
    seo: {},
    is_published: true,
    sort_order: 0,
  },

  about: {
    key: "about",
    title: { en: "About", he: "אודות" },
    hero: {
      title: { en: "About Amit Kochavi", he: "אודות עמית כוכבי" },
      subtitle: {
        en: "Entrepreneur, investor, and public servant — building between Tel Aviv and Los Angeles.",
        he: "יזם, משקיע ואיש ציבור — בונה בין תל אביב ללוס אנג'לס.",
      },
    },
    blocks: [
      {
        id: "about-bio",
        type: "text",
        body: {
          en: `<p>I was born in Tel Aviv on December 10th, 1997, into a family that taught me two things early: that wealth is a responsibility before it is a privilege, and that nothing you inherit matters as much as what you build.</p>
<p>I'm a fourth-generation entrepreneur. On one side of my family stands Max Factor Sr., who left Łódź for Los Angeles and built one of the most recognized names in the history of beauty — proof that an immigrant with a craft and conviction can shape global culture. On the other side, generations of builders and investors in Israel and the United States who developed real estate, backed businesses, and gave back to the communities that made their success possible. Growing up between Tel Aviv and Los Angeles, I absorbed both worlds: Israeli directness and ambition, and American scale and institution-building.</p>
<p>In March 2019, at 21, I founded my first company, Circles Ltd. We started with an innovation-management platform, sold it to our first customers, and failed. So we did what founders do — we listened, pivoted, and rebuilt the company as Cormi, a workflow and forms platform serving businesses in construction and manufacturing, backed by leading Israeli investors including the owner of Tidhar, one of Israel's largest construction groups. The lesson of those years stays with me: resilience is not a slogan. It is the daily practice of showing up after the plan breaks.</p>
<p>Today I lead Starwell Holdings, the platform through which I build, invest, and advise — from technology services consolidation to large-scale urban development in Tel Aviv-Jaffa.</p>
<p>But the chapter that changed my life began on October 7th, 2023. In the aftermath of that day, I joined the Mayor of Sderot as a senior advisor, working alongside the Tkuma Directorate in the Prime Minister's Office to help structure the city's economic recovery and long-term development plan. Sderot taught me what business never could: that the hardest, most meaningful work is rebuilding a community's belief in its own future.</p>
<p>That work sits at the center of everything I do now — alongside board service at the Buchman Heyman Foundation and the Sharon &amp; Herb Glaser Foundation, membership in TAU Aurion, Tel Aviv University's next-generation leadership community, and participation in Voice of the People, the President of Israel's global council on the future of the Jewish people.</p>
<p>I split my time between Tel Aviv and Los Angeles. I believe in free markets, strong security, a pluralistic Israel, and an unbreakable bond between Israel and the Jewish Diaspora. And I believe the next generation of Israeli leadership has to be built the old way: by doing the work first.</p>`,
          he: `<p>נולדתי בתל אביב ב-10 בדצמבר 1997, למשפחה שלימדה אותי שני דברים כבר בגיל צעיר: שעושר הוא אחריות לפני שהוא זכות, ושדבר מכל מה שאתה יורש אינו חשוב כמו מה שאתה בונה בעצמך.</p>
<p>אני יזם מהדור הרביעי. בצד אחד של משפחתי עומד מקס פקטור האב, שעזב את לודז' לטובת לוס אנג'לס ובנה אחד מהשמות המוכרים ביותר בתולדות עולם היופי — הוכחה לכך שמהגר בעל מלאכה והכרה יכול לעצב תרבות גלובלית. בצד השני, דורות של בונים ומשקיעים בישראל ובארצות הברית, שפיתחו נדל"ן, גיבו עסקים, והחזירו לקהילות שאפשרו את הצלחתם. כשגדלתי בין תל אביב ללוס אנג'לס, ספגתי את שני העולמות: הישירות והשאפתנות הישראלית, והעוצמה ובניית המוסדות האמריקאית.</p>
<p>במרץ 2019, בגיל 21, הקמתי את החברה הראשונה שלי, Circles Ltd. התחלנו עם פלטפורמה לניהול חדשנות, מכרנו ללקוחותינו הראשונים — ונכשלנו. אז עשינו את מה שיזמים עושים: הקשבנו, ביצענו פיבוט, ובנינו מחדש את החברה כ-Cormi, פלטפורמת תהליכים וטפסים המשרתת עסקים בתחומי הבנייה והייצור, בגיבוי משקיעים ישראליים מובילים ובהם הבעלים של תדהר, אחת מקבוצות הבנייה הגדולות בישראל. הלקח של אותן שנים נותר עמי: חוסן אינו סיסמה. הוא התרגול היומיומי של לקום שוב לאחר שהתוכנית מתנפצת.</p>
<p>כיום אני עומד בראש Starwell Holdings, הפלטפורמה שדרכה אני בונה, משקיע ומייעץ — מאיחוד שירותי טכנולוגיה ועד התחדשות עירונית בקנה מידה גדול בתל אביב-יפו.</p>
<p>אך הפרק ששינה את חיי החל ב-7 באוקטובר 2023. בעקבות אותו יום הצטרפתי לראש עיריית שדרות כיועץ בכיר, ופעלתי לצד מינהלת תקומה במשרד ראש הממשלה כדי לעצב את תוכנית ההתאוששות הכלכלית והפיתוח ארוך-הטווח של העיר. שדרות לימדה אותי את מה שהעסקים מעולם לא יכלו: שהעבודה הקשה והמשמעותית ביותר היא לשקם את אמונתה של קהילה בעתידה.</p>
<p>עבודה זו ניצבת במרכז כל מה שאני עושה כיום — לצד חברות בדירקטוריונים של קרן בוכמן-היימן וקרן שרון והרב גלייזר, חברות ב-TAU Aurion, קהילת המנהיגות הצעירה של אוניברסיטת תל אביב, והשתתפות ב-Voice of the People, מועצת נשיא המדינה העולמית לעתיד העם היהודי.</p>
<p>אני מחלק את זמני בין תל אביב ללוס אנג'לס. אני מאמין בשווקים חופשיים, בביטחון חזק, בישראל פלורליסטית, ובברית בל-תינתק בין ישראל ליהדות התפוצות. ואני מאמין שעל הדור הבא של המנהיגות הישראלית להיבנות בדרך הישנה: קודם כול עושים את העבודה.</p>`,
        },
      },
      {
        id: "about-values",
        type: "quote",
        body: {
          en: "Wealth is a responsibility before it is a privilege — and nothing you inherit matters as much as what you build.",
          he: "עושר הוא אחריות לפני שהוא זכות — ודבר ממה שאתה יורש אינו חשוב כמו מה שאתה בונה בעצמך.",
        },
        attribution: { en: "Amit Kochavi", he: "עמית כוכבי" },
      },
    ],
    seo: {},
    is_published: true,
    sort_order: 1,
  },

  business: {
    key: "business",
    title: { en: "Business", he: "עסקים" },
    hero: {
      title: { en: "Business Career", he: "קריירה עסקית" },
      subtitle: {
        en: "Building and backing companies that create lasting value.",
        he: "בנייה וגיבוי חברות שיוצרות ערך לאורך זמן.",
      },
    },
    blocks: [
      {
        id: "biz-overview",
        type: "text",
        heading: { en: "An entrepreneur’s path", he: "דרכו של יזם" },
        body: {
          en: "Across more than two decades, Amit Kochavi has founded, led, and invested in businesses spanning technology, real estate, and growth-stage enterprise. His approach pairs long-term vision with operational discipline — building companies designed to endure and to create meaningful employment.",
          he: "במשך למעלה משני עשורים ייסד עמית כוכבי, הוביל והשקיע בעסקים בתחומי הטכנולוגיה, הנדל\"ן וחברות בצמיחה. גישתו משלבת חזון ארוך-טווח עם משמעת תפעולית — בניית חברות שנועדו להתמיד וליצור תעסוקה משמעותית.",
        },
      },
      {
        id: "biz-stats",
        type: "stat",
        items: [
          { value: { en: "20+", he: "20+" }, label: { en: "Years in business", he: "שנות פעילות עסקית" } },
          { value: { en: "Multiple", he: "מספר" }, label: { en: "Companies founded & backed", he: "חברות שהוקמו וגובו" } },
          { value: { en: "Long-term", he: "ארוך-טווח" }, label: { en: "Investment horizon", he: "אופק השקעה" } },
        ],
      },
      {
        id: "biz-approach",
        type: "text",
        heading: { en: "Philosophy", he: "פילוסופיה" },
        body: {
          en: "Credibility, patience, and partnership define how Amit works. He invests in people first, builds trust over years, and measures returns not only in capital but in the opportunity and stability his ventures create.",
          he: "אמינות, סבלנות ושותפות מאפיינות את דרכו של עמית. הוא משקיע קודם כל באנשים, בונה אמון לאורך שנים, ומודד תשואה לא רק בהון אלא גם בהזדמנות וביציבות שמיזמיו יוצרים.",
        },
      },
    ],
    seo: {},
    is_published: true,
    sort_order: 2,
  },

  philanthropy: {
    key: "philanthropy",
    title: { en: "Philanthropy", he: "פילנתרופיה" },
    hero: {
      title: { en: "Philanthropy", he: "פילנתרופיה" },
      subtitle: {
        en: "A fourth-generation tradition of giving.",
        he: "מסורת נתינה מהדור הרביעי.",
      },
    },
    blocks: [
      {
        id: "phil-legacy",
        type: "text",
        heading: { en: "Four generations of giving", he: "ארבעה דורות של נתינה" },
        body: {
          en: "Philanthropy is, for Amit Kochavi, an inheritance and a responsibility. As a fourth-generation philanthropist, he carries forward a family legacy in which giving is not an occasional act but a way of life — directed toward education, community resilience, and opportunity for the next generation.",
          he: "עבור עמית כוכבי, הפילנתרופיה היא ירושה ואחריות כאחד. כפילנתרופ מהדור הרביעי, הוא ממשיך מורשת משפחתית שבה הנתינה אינה מעשה מזדמן אלא דרך חיים — המכוונת לחינוך, לחוסן קהילתי ולהזדמנות עבור הדור הבא.",
        },
      },
      {
        id: "phil-focus",
        type: "cards",
        heading: { en: "Areas of focus", he: "תחומי מיקוד" },
        items: [
          {
            title: { en: "Education", he: "חינוך" },
            body: {
              en: "Scholarships and programs that open doors for young people.",
              he: "מלגות ותכניות שפותחות דלתות לצעירים.",
            },
          },
          {
            title: { en: "Community", he: "קהילה" },
            body: {
              en: "Strengthening the social fabric of southern Israel.",
              he: "חיזוק המרקם החברתי של דרום הארץ.",
            },
          },
          {
            title: { en: "Resilience", he: "חוסן" },
            body: {
              en: "Supporting families and institutions in times of need.",
              he: "תמיכה במשפחות ובמוסדות בעת צרה.",
            },
          },
        ],
      },
    ],
    seo: {},
    is_published: true,
    sort_order: 3,
  },

  "public-service": {
    key: "public-service",
    title: { en: "Public Service", he: "שירות ציבורי" },
    hero: {
      title: { en: "Public Service in Sderot", he: "שירות ציבורי בשדרות" },
      subtitle: {
        en: "Standing with the people of Sderot and the Negev.",
        he: "עומד לצד תושבי שדרות והנגב.",
      },
    },
    blocks: [
      {
        id: "ps-sderot",
        type: "text",
        heading: { en: "A commitment to Sderot", he: "מחויבות לשדרות" },
        body: {
          en: "Public service, for Amit Kochavi, begins close to home. He has dedicated himself to the people of Sderot — a community known for its extraordinary resilience — working to advance recovery, security, education, and long-term growth so that residents can build their futures with confidence.",
          he: "השירות הציבורי, עבור עמית כוכבי, מתחיל קרוב לבית. הוא הקדיש את עצמו לתושבי שדרות — קהילה הידועה בחוסנה יוצא הדופן — ופועל לקידום שיקום, ביטחון, חינוך וצמיחה ארוכת-טווח, כדי שהתושבים יוכלו לבנות את עתידם מתוך ביטחון.",
        },
      },
      {
        id: "ps-initiatives",
        type: "cards",
        heading: { en: "Where the work focuses", he: "במה מתמקד הפועל" },
        items: [
          {
            title: { en: "Recovery & Resilience", he: "שיקום וחוסן" },
            body: {
              en: "Helping the city and its residents rebuild and thrive.",
              he: "סיוע לעיר ולתושביה להשתקם ולשגשג.",
            },
          },
          {
            title: { en: "Youth & Education", he: "נוער וחינוך" },
            body: {
              en: "Investing in the next generation of Sderot’s leaders.",
              he: "השקעה בדור הבא של מנהיגי שדרות.",
            },
          },
          {
            title: { en: "Community", he: "קהילה" },
            body: {
              en: "Programs that bring people together and create opportunity.",
              he: "תכניות שמקרבות בין אנשים ויוצרות הזדמנות.",
            },
          },
        ],
      },
    ],
    seo: {},
    is_published: true,
    sort_order: 4,
  },

  contact: {
    key: "contact",
    title: { en: "Contact", he: "צור קשר" },
    hero: {
      title: { en: "Get in touch", he: "יצירת קשר" },
      subtitle: {
        en: "For media, speaking, and partnership enquiries.",
        he: "לפניות תקשורת, הרצאות ושיתופי פעולה.",
      },
    },
    blocks: [
      {
        id: "contact-intro",
        type: "text",
        body: {
          en: "Please use the form below or reach out by email. Messages are reviewed by Amit Kochavi’s office.",
          he: "ניתן להשתמש בטופס שלהלן או לפנות בדוא\"ל. ההודעות מטופלות על ידי משרדו של עמית כוכבי.",
        },
      },
    ],
    seo: {},
    is_published: true,
    sort_order: 5,
  },
};

export const FALLBACK_MEDIA: MediaItem[] = [
  {
    id: "seed-1",
    slug: "building-for-the-long-term",
    kind: "article",
    title: {
      en: "Building for the Long Term",
      he: "לבנות לטווח הארוך",
    },
    excerpt: {
      en: "Why patient capital and people-first leadership create companies that last.",
      he: "מדוע הון סבלני ומנהיגות שמציבה אנשים במרכז יוצרים חברות שמתמידות.",
    },
    body: {
      en: "An essay on the principles behind two decades of entrepreneurship — and why credibility compounds.",
      he: "מאמר על העקרונות שמאחורי שני עשורים של יזמות — ומדוע אמינות צוברת ערך עם הזמן.",
    },
    published_at: "2026-01-15",
    is_published: true,
    sort_order: 0,
    seo: {},
  },
  {
    id: "seed-2",
    slug: "standing-with-sderot",
    kind: "writing",
    title: {
      en: "Standing With Sderot",
      he: "עומדים עם שדרות",
    },
    excerpt: {
      en: "On resilience, recovery, and the responsibility to invest in community.",
      he: "על חוסן, שיקום והאחריות להשקיע בקהילה.",
    },
    body: {
      en: "Reflections on what it means to serve the place you call home.",
      he: "הרהורים על משמעות השירות למקום שאתה קורא לו בית.",
    },
    published_at: "2026-02-20",
    is_published: true,
    sort_order: 1,
    seo: {},
  },
  {
    id: "seed-3",
    slug: "a-family-legacy-of-giving",
    kind: "press",
    title: {
      en: "A Family Legacy of Giving",
      he: "מורשת משפחתית של נתינה",
    },
    excerpt: {
      en: "How four generations shaped a philosophy of philanthropy.",
      he: "כיצד ארבעה דורות עיצבו תפיסת פילנתרופיה.",
    },
    body: {
      en: "A profile of the values passed down through a fourth-generation philanthropist.",
      he: "פרופיל של הערכים שעברו מדור לדור אצל פילנתרופ מהדור הרביעי.",
    },
    published_at: "2026-03-10",
    is_published: true,
    sort_order: 2,
    seo: {},
  },
];
