import type {
  Localized,
  MediaItem,
  MediaKind,
  Page,
  PageKey,
  SiteSettings,
} from "@/types/content";

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
    alternateName: [
      "Amit L. Kochavi",
      "Amit Lev Kochavi",
      "עמית כוכבי",
      "עמית לב כוכבי",
    ],
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
    seo: {
      title: {
        en: "Amit Kochavi — Business, Philanthropy & Public Service",
        he: "עמית כוכבי — עסקים, פילנתרופיה ושירות ציבורי",
      },
    },
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
        id: "phil-foundations",
        type: "cards",
        heading: { en: "Our family foundations", he: "קרנות המשפחה שלנו" },
        items: [
          {
            title: {
              en: "The Buchman Heyman Foundation",
              he: "קרן בוכמן־היימן",
            },
            body: {
              en: "Founded in 1942 by Sara Buchman.",
              he: "נוסדה ב-1942 על ידי שרה בוכמן.",
            },
          },
          {
            title: {
              en: "The Herb & Sharon Glaser Foundation",
              he: "קרן הרב ושרון גלייזר",
            },
            body: { en: "", he: "" },
          },
          {
            title: {
              en: "The Max Factor Family Foundation",
              he: "קרן משפחת מקס פקטור",
            },
            body: {
              en: "Continuing the legacy of Max Factor Sr.",
              he: "ממשיכה את מורשתו של מקס פקטור האב.",
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
        heading: {
          en: "Initiatives since October 7th",
          he: "יוזמות מאז ה-7 באוקטובר",
        },
        items: [
          {
            title: { en: "Rimon Music School", he: "בית הספר למוזיקה רימון" },
            body: {
              en: "Founded a music school in Sderot. Budget ≈ ₪30M.",
              he: "הקמת בית ספר למוזיקה בשדרות. תקציב של כ-30 מיליון ש\"ח.",
            },
          },
          {
            title: {
              en: "Seven Bilingual Kindergartens",
              he: "שבעה גני ילדים דו-לשוניים",
            },
            body: {
              en: "English–Hebrew kindergartens, with a multi-million-shekel budget.",
              he: "גנים דו-לשוניים באנגלית ובעברית, בתקציב של מיליוני שקלים.",
            },
          },
          {
            title: {
              en: "Faculty of Technology, Sapir Academic College",
              he: "הפקולטה לטכנולוגיה במכללת ספיר",
            },
            body: {
              en: "Founding-team member of a new technology faculty in Sderot — 15,000 m² (≈161,500 sq ft) beside the train station. Budget ≈ ₪500M.",
              he: "חבר צוות מייסד של פקולטה חדשה לטכנולוגיה בשדרות — 15,000 מ\"ר (כ-161,500 רגל רבוע) סמוך לתחנת הרכבת. תקציב של כ-500 מיליון ש\"ח.",
            },
          },
          {
            title: {
              en: "Tech Relocation to the Gaza Envelope",
              he: "רילוקיישן של הייטק לעוטף עזה",
            },
            body: {
              en: "A program bringing tech employees from central Israel to Sderot and the Gaza-envelope region — a ₪100M effort to attract over 400 families.",
              he: "תוכנית להבאת עובדי הייטק ממרכז הארץ לשדרות ולעוטף עזה — מאמץ בתקציב של 100 מיליון ש\"ח למשיכת למעלה מ-400 משפחות.",
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

const loc = (en: string, he?: string): Localized => ({ en, he: he ?? en });

/** A book on the reading list (rendered on /books). */
function book(
  order: number,
  slug: string,
  title: string,
  author: string,
): MediaItem {
  return {
    id: `book-${order}`,
    slug,
    kind: "reading",
    title: loc(title),
    excerpt: loc(author),
    body: loc(""),
    published_at: null,
    is_published: true,
    sort_order: order,
    seo: {},
  };
}

/** A press mention or article (rendered on /media; links to the source). */
function press(
  order: number,
  opts: {
    slug: string;
    kind?: MediaKind;
    title: Localized;
    outlet: Localized;
    url: string;
    date?: string;
  },
): MediaItem {
  return {
    id: `press-${order}`,
    slug: opts.slug,
    kind: opts.kind ?? "press",
    title: opts.title,
    excerpt: opts.outlet,
    body: loc(""),
    external_url: opts.url,
    published_at: opts.date ?? null,
    is_published: true,
    sort_order: order,
    seo: {},
  };
}

export const FALLBACK_BOOKS: MediaItem[] = [
  book(0, "shoe-dog", "Shoe Dog", "Phil Knight"),
  book(1, "my-life", "My Life", "Bill Clinton"),
  book(2, "elon-musk", "Elon Musk", "Walter Isaacson"),
  book(3, "what-it-takes", "What It Takes", "Stephen A. Schwarzman"),
  book(4, "embracing-defeat", "Embracing Defeat", "John W. Dower"),
  book(5, "the-alchemist", "The Alchemist", "Paulo Coelho"),
  book(6, "principles", "Principles", "Ray Dalio"),
  book(
    7,
    "how-to-make-a-few-billion-dollars",
    "How to Make a Few Billion Dollars",
    "Brad Jacobs",
  ),
  book(
    8,
    "fall-in-love-with-the-problem",
    "Fall in Love with the Problem, Not the Solution",
    "Uri Levine",
  ),
  book(
    9,
    "the-challenger-sale",
    "The Challenger Sale",
    "Brent Adamson & Matthew Dixon",
  ),
  book(10, "the-ride-of-a-lifetime", "The Ride of a Lifetime", "Bob Iger"),
  book(11, "thinking-fast-and-slow", "Thinking, Fast and Slow", "Daniel Kahneman"),
  book(12, "bloomberg-by-bloomberg", "Bloomberg by Bloomberg", "Mike Bloomberg"),
];

export const FALLBACK_PRESS: MediaItem[] = [
  press(16, {
    slug: "walla-rimon-music-school",
    title: loc("Sderot’s Rimon Music School", "בית הספר למוזיקה רימון בשדרות"),
    outlet: loc("Walla Finance", "וואלה! פיננסים"),
    url: "https://finance.walla.co.il/item/3732149",
  }),
  press(11, {
    slug: "themarker-40-under-40",
    title: loc("TheMarker 40 Under 40", "40 הצעירים המבטיחים של דה־מרקר"),
    outlet: loc("TheMarker", "דה־מרקר"),
    url: "https://www.themarker.com/magazine/2025-01-01/ty-article-magazine/.premium/00000194-12c9-da93-a9dc-9ee9e4080000",
    date: "2025-01-01",
  }),
  press(6, {
    slug: "forward-oct7-sderot",
    kind: "writing",
    title: loc("Oct. 7, Israel’s recovery, and the rebuilding of Sderot"),
    outlet: loc("The Forward", "פורוורד"),
    url: "https://forward.com/opinion/659484/oct-7-israel-recovery-sderot/",
  }),
  press(4, {
    slug: "success-vision-and-adaptability",
    kind: "article",
    title: loc("Amit Kochavi: A Blend of Vision and Adaptability"),
    outlet: loc("Success"),
    url: "https://www.success.com/amit-kochavi-a-blend-of-vision-and-adaptability",
  }),
  press(3, {
    slug: "jns-clemson-hebrewu-sapir",
    title: loc(
      "Clemson, Hebrew U & Sapir partnership ‘a perfect match,’ says Nikki Haley",
    ),
    outlet: loc("JNS"),
    url: "https://www.jns.org/u.s.-news/clemson-hebrew-u-sapir-partnership-a-perfect-match-nikki-haley-says",
  }),
  press(5, {
    slug: "israel-hayom-tech",
    title: loc("Amit Kochavi in Israel Hayom", "עמית כוכבי בישראל היום"),
    outlet: loc("Israel Hayom — Tech", "ישראל היום — טכנולוגיה"),
    url: "https://www.israelhayom.co.il/tech/tech-news/article/15583312",
  }),
  press(0, {
    slug: "walla-cormi-doss",
    title: loc(
      "Cormi partners with Doss Inc.",
      "Cormi בשיתוף פעולה עם Doss Inc.",
    ),
    outlet: loc("Walla Finance", "וואלה! פיננסים"),
    url: "https://finance.walla.co.il/item/3753758",
  }),
  press(1, {
    slug: "davar-cormi-circles",
    title: loc(
      "Cormi (Circles IT Innovation)",
      "Cormi (סירקלס איי.טי אינוביישן)",
    ),
    outlet: loc("Davar", "דבר"),
    url: "https://www.davar1.co.il/389697/",
  }),
  press(9, {
    slug: "makor-rishon-sderot",
    title: loc(
      "In conversation with Aviad Friedman on Sderot",
      "בריאיון עם אביעד פרידמן על שדרות",
    ),
    outlet: loc("Makor Rishon", "מקור ראשון"),
    url: "https://www.makorrishon.co.il/news/settlement/article/161849",
  }),
  press(8, {
    slug: "israel-hayom-early-profile",
    title: loc("Israel Hayom: an early profile", "ישראל היום: פרופיל מוקדם"),
    outlet: loc("Israel Hayom", "ישראל היום"),
    url: "https://www.israelhayom.co.il/article/296635",
  }),
  press(7, {
    slug: "jpost-feature",
    title: loc("Featured in The Jerusalem Post"),
    outlet: loc("The Jerusalem Post"),
    url: "https://www.jpost.com/israel-news/article-834231",
  }),
  press(2, {
    slug: "clemson-israeli-universities",
    title: loc("Clemson & Israeli universities partner to advance agriculture"),
    outlet: loc("Who’s on the Move"),
    url: "https://whosonthemove.com/clemson-israeli-universities-partnership-will-advance-agriculture/",
  }),
  press(10, {
    slug: "calbizjournal-hebrewu-clemson",
    title: loc("Hebrew University and Clemson forge agricultural partnership"),
    outlet: loc("California Business Journal"),
    url: "https://calbizjournal.com/hebrew-university-and-clemson-university-forge-agricultural-partnership/",
  }),
  press(12, {
    slug: "calcalist-circles",
    title: loc("Calcalist: Circles", "כלכליסט: Circles"),
    outlet: loc("Calcalist", "כלכליסט"),
    url: "https://calcalist360.webflow.io/articles/circles",
  }),
  press(13, {
    slug: "atlwire-digitizing-industries",
    kind: "article",
    title: loc("Meet Amit Kochavi: Digitizing Traditional Industries"),
    outlet: loc("ATL Wire"),
    url: "https://atlwire.com/meet-amit-kochavi-digitizing-traditional-industries/",
  }),
  press(14, {
    slug: "cleveland-jewish-news-mou",
    title: loc("Hebrew U & Sapir sign MOU with Clemson"),
    outlet: loc("Cleveland Jewish News"),
    url: "https://www.clevelandjewishnews.com/jns/hebrew-u-sapir-college-sign-mou-with-clemson-to-tackle-agricultural-issues/article_8b3d14bb-bb15-51f2-8784-e6ef4211d1ff.html",
  }),
  press(15, {
    slug: "syp-studios-deskless-employees",
    kind: "article",
    title: loc("An Employee Engagement Platform for Deskless Employees"),
    outlet: loc("SYP Studios"),
    url: "https://sypstudios.com/amit-kochavi-providing-an-employee-engagement-platform-for-deskless-employees",
  }),
];

export const FALLBACK_MEDIA: MediaItem[] = [...FALLBACK_PRESS, ...FALLBACK_BOOKS];
