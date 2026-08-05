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
 * Copy follows the v2 spec: Hebrew is the default locale, English the
 * secondary. Items marked [CONFIRM] are the only places awaiting Amit's
 * approval; they are left visibly marked in this draft, never invented.
 */

export const FALLBACK_SETTINGS: SiteSettings = {
  site_name: { en: "Amit Kochavi", he: "עמית כוכבי" },
  tagline: {
    en: "Senior Advisor to the Mayor of Sderot | Entrepreneur | Socio-economic development and delivery",
    he: "יועץ בכיר לראש עיריית שדרות | יזם | ביצוע ופיתוח כלכלי-חברתי",
  },
  contact_email: "contact@amitkochavi.com",
  social_links: [
    { platform: "X", url: "https://x.com/AmitKochavi" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/amitkochavi/" },
  ],
  seo_defaults: {
    title: {
      en: "Amit Kochavi | Senior Advisor to the Mayor of Sderot",
      he: "עמית כוכבי | יועץ בכיר לראש עיריית שדרות",
    },
    description: {
      en: "Senior Advisor to the Mayor of Sderot, council member of the President's Voice of the People initiative, entrepreneur and founder of Starwell Holdings.",
      he: "יועץ בכיר לראש עיריית שדרות, חבר מועצת קול העם של נשיא המדינה, יזם ומייסד סטארוול הולדינגס.",
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
    jobTitle: {
      en: "Senior Advisor to the Mayor of Sderot; Founder of Starwell Holdings",
      he: "יועץ בכיר לראש עיריית שדרות; מייסד סטארוול הולדינגס",
    },
    description: {
      en: "Senior Advisor to the Mayor of Sderot, council member of the President's Voice of the People initiative, entrepreneur and founder of Starwell Holdings.",
      he: "יועץ בכיר לראש עיריית שדרות, חבר מועצת קול העם של נשיא המדינה, יזם ומייסד סטארוול הולדינגס.",
    },
    sameAs: [
      "https://x.com/AmitKochavi",
      "https://www.linkedin.com/in/amitkochavi/",
    ],
    worksFor: "Starwell Holdings",
    knowsAbout: [
      "Public Service",
      "Sderot",
      "Entrepreneurship",
      "Investment",
      "Information Technology",
      "Real Estate",
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
        en: "Senior Advisor to the Mayor of Sderot | Entrepreneur | Socio-economic development and delivery",
        he: "יועץ בכיר לראש עיריית שדרות | יזם | ביצוע ופיתוח כלכלי-חברתי",
      },
      cta_label: { en: "", he: "" },
      cta_href: "",
    },
    blocks: [
      {
        id: "home-pillars",
        type: "cards",
        heading: { en: "Explore", he: "עוד" },
        items: [
          {
            title: { en: "Public Service", he: "שירות ציבורי" },
            body: {
              en: "Senior Advisor to the Mayor of Sderot, working on the city's recovery since October 7th.",
              he: "יועץ בכיר לראש עיריית שדרות, בעבודה על שיקום העיר מאז השבעה באוקטובר.",
            },
            href: "/public-service",
          },
          {
            title: { en: "Business", he: "עסקים" },
            body: {
              en: "Founder of Starwell Holdings.",
              he: "מייסד סטארוול הולדינגס.",
            },
            href: "/business",
          },
          {
            title: { en: "Philanthropy", he: "פילנתרופיה" },
            body: {
              en: "Board member of the family's two foundations.",
              he: "חבר דירקטוריון בשתי קרנות המשפחה.",
            },
            href: "/philanthropy",
          },
        ],
      },
    ],
    seo: {
      title: {
        en: "Amit Kochavi",
        he: "עמית כוכבי",
      },
      description: {
        en: "Senior Advisor to the Mayor of Sderot, council member of the President's Voice of the People initiative, entrepreneur and founder of Starwell Holdings.",
        he: "יועץ בכיר לראש עיריית שדרות, חבר מועצת קול העם של נשיא המדינה, יזם ומייסד סטארוול הולדינגס.",
      },
    },
    is_published: true,
    sort_order: 0,
  },

  about: {
    key: "about",
    title: { en: "About", he: "אודות" },
    hero: {
      title: { en: "About", he: "אודות" },
      subtitle: { en: "", he: "" },
    },
    blocks: [
      {
        id: "about-bio",
        type: "text",
        body: {
          en: `<p>Amit Kochavi, 28, is Senior Advisor to the Mayor of Sderot and a council member of the President's Voice of the People initiative. An entrepreneur, he is the founder of Starwell Holdings and serves on the boards of his family's foundations. [CONFIRM: closing sentence about where he lives, or omit]</p>`,
          he: `<p>עמית כוכבי, 28, הוא יועץ בכיר לראש עיריית שדרות וחבר מועצת "קול העם" של נשיא המדינה. יזם ומייסד סטארוול הולדינגס, וחבר דירקטוריון בקרנות המשפחה. מתגורר בין שדרות לתל אביב. [CONFIRM: the last sentence, or delete it]</p>`,
        },
      },
    ],
    seo: {},
    is_published: true,
    sort_order: 1,
  },

  "public-service": {
    key: "public-service",
    title: { en: "Public Service", he: "שירות ציבורי" },
    hero: {
      title: { en: "Public Service", he: "שירות ציבורי" },
      subtitle: { en: "", he: "" },
    },
    blocks: [
      {
        id: "ps-body",
        type: "text",
        body: {
          en: `<p>Senior Advisor to Sderot Mayor Alon Davidi. Since October 7th, working with the Tkuma Directorate on the city's recovery and growth: the opening of the Rimon Music School, new kindergartens, a relocation program for tech families, and the advancement of a Sapir College technology campus, part of a strategic plan to double the city's population.</p>
<p>Council member of Voice of the People, the initiative of President Isaac Herzog.</p>
<p>Member of Aurion, the Next Generation Board of Governors of Tel Aviv University.</p>`,
          he: `<p>יועץ בכיר לראש עיריית שדרות אלון דוידי. מאז השבעה באוקטובר, עבודה מול מינהלת תקומה על שיקום העיר וצמיחתה: פתיחת בית הספר למוסיקה רימון, גני ילדים חדשים, תוכנית קליטה למשפחות הייטק וקידום קמפוס טכנולוגי של מכללת ספיר, במסגרת תוכנית אסטרטגית להכפלת אוכלוסיית העיר.</p>
<p>חבר מועצת המנהיגות של "קול העם", יוזמת נשיא המדינה יצחק הרצוג.</p>
<p>חבר Aurion, דור ההמשך של חבר הנאמנים של אוניברסיטת תל אביב. [CONFIRM: exact Hebrew rendering of the program name]</p>`,
        },
      },
    ],
    seo: {},
    is_published: true,
    sort_order: 2,
  },

  business: {
    key: "business",
    title: { en: "Business", he: "עסקים" },
    hero: {
      title: { en: "Business", he: "עסקים" },
      subtitle: { en: "", he: "" },
    },
    blocks: [
      {
        id: "biz-body",
        type: "text",
        body: {
          en: `<p>Founder of Starwell Holdings: a private group that builds and operates Israeli technology and IT services companies, alongside the family's real estate activity and investments.</p>`,
          he: `<p>מייסד סטארוול הולדינגס: קבוצה פרטית הבונה ומפעילה חברות טכנולוגיה ושירותי IT בישראל, לצד המשך פעילות הנדל"ן המשפחתית והשקעות.</p>`,
        },
      },
    ],
    seo: {},
    is_published: true,
    sort_order: 3,
  },

  philanthropy: {
    key: "philanthropy",
    title: { en: "Philanthropy", he: "פילנתרופיה" },
    hero: {
      title: { en: "Philanthropy", he: "פילנתרופיה" },
      subtitle: { en: "", he: "" },
    },
    blocks: [
      {
        id: "phil-body",
        type: "text",
        body: {
          en: `<p>The family's giving is centered in two foundations: the Buchman Heyman Foundation, established by Sara Buchman in 1942, and the Herb and Sharon Glaser Foundation. [CONFIRM: focus areas line]</p>
<p>Amit serves on the board of both foundations. [CONFIRM: exact role titles]</p>`,
          he: `<p>פעילות הנתינה של המשפחה מרוכזת בשתי קרנות: קרן בוכמן-היימן, שהוקמה בידי שרה בוכמן בשנת 1942, וקרן הרברט ושרון גלייזר. [CONFIRM: Hebrew spelling of Glaser; note that "Herb" must be rendered הרברט, never הרב] [CONFIRM: one line on focus areas, e.g. education and community, only if publicly stated]</p>
<p>עמית מכהן כחבר דירקטוריון בשתי הקרנות. [CONFIRM: exact role titles]</p>`,
        },
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
      title: { en: "Contact", he: "צור קשר" },
      subtitle: { en: "", he: "" },
    },
    blocks: [],
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

// Media page keeps two items, in this order. A clean slot is left at the top
// of the list for a future op-ed (sort_order below 0) to be added later.
export const FALLBACK_PRESS: MediaItem[] = [
  press(0, {
    slug: "forward-oct7-sderot",
    kind: "writing",
    title: loc(
      "Oct. 7, Israel's recovery, and the rebuilding of Sderot",
      "על שיקום שדרות והיום שאחרי",
    ),
    outlet: loc("The Forward", "The Forward (אנגלית)"),
    url: "https://forward.com/opinion/659484/oct-7-israel-recovery-sderot/",
  }),
  press(1, {
    slug: "walla-rimon-music-school",
    title: loc("Sderot's Rimon Music School", "בית הספר למוסיקה רימון"),
    outlet: loc("Walla Finance", "וואלה כסף"),
    url: "https://finance.walla.co.il/item/3732149",
  }),
];

export const FALLBACK_MEDIA: MediaItem[] = [...FALLBACK_PRESS, ...FALLBACK_BOOKS];
