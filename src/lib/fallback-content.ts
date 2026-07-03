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
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/amitkochavi/" },
    { platform: "Starwell Holdings", url: "https://starwellholdings.com/en/" },
  ],
  seo_defaults: {
    title: {
      en: "Amit Kochavi — Business, Philanthropy & Public Service",
      he: "עמית כוכבי — עסקים, פילנתרופיה ושירות ציבורי",
    },
    description: {
      en: "Amit Kochavi — founder of Starwell Holdings and senior advisor to the Mayor of Sderot. Building companies and city-scale projects between Tel Aviv and Los Angeles.",
      he: "עמית כוכבי — מייסד סטארוול הולדינגס ויועץ בכיר לראש עיריית שדרות. בונה חברות ופרויקטים עירוניים בין תל אביב ללוס אנג'לס.",
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
      en: "Founder of Starwell Holdings; Senior Advisor to the Mayor of Sderot",
      he: "מייסד סטארוול הולדינגס; יועץ בכיר לראש עיריית שדרות",
    },
    description: {
      en: "Amit Kochavi is an entrepreneur and investor, the founder of Starwell Holdings, and senior advisor to the Mayor of Sderot — working between Tel Aviv and Los Angeles.",
      he: "עמית כוכבי הוא יזם ומשקיע, מייסד סטארוול הולדינגס ויועץ בכיר לראש עיריית שדרות — פועל בין תל אביב ללוס אנג'לס.",
    },
    sameAs: ["https://www.linkedin.com/in/amitkochavi/"],
    worksFor: "Starwell Holdings",
    knowsAbout: [
      "Entrepreneurship",
      "Investment",
      "Information Technology",
      "Real Estate",
      "Public Service",
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
        en: "Founder of Starwell Holdings. Senior advisor to the Mayor of Sderot. Building between Tel Aviv and Los Angeles.",
        he: "מייסד סטארוול הולדינגס. יועץ בכיר לראש עיריית שדרות. בונה בין תל אביב ללוס אנג'לס.",
      },
      cta_label: { en: "Learn more", he: "מידע נוסף" },
      cta_href: "/about",
    },
    blocks: [
      {
        id: "home-pillars",
        type: "cards",
        heading: { en: "Explore", he: "גלו עוד" },
        items: [
          {
            title: { en: "Business", he: "עסקים" },
            body: {
              en: "Starwell Holdings: a technology arm buying and building Israeli IT companies, a real estate arm continuing four generations of family business, and an investments arm.",
              he: "סטארוול הולדינגס: זרוע טכנולוגיה שרוכשת ובונה חברות IT ישראליות, זרוע נדל\"ן שממשיכה ארבעה דורות של עסק משפחתי, וזרוע השקעות.",
            },
            href: "/business",
          },
          {
            title: { en: "Philanthropy", he: "פילנתרופיה" },
            body: {
              en: "Four generations of family giving in Israel and Los Angeles. Two foundation board seats.",
              he: "ארבעה דורות של נתינה משפחתית בישראל ובלוס אנג'לס. שני מושבי דירקטוריון.",
            },
            href: "/philanthropy",
          },
          {
            title: { en: "Public Service", he: "שירות ציבורי" },
            body: {
              en: "Working with the Mayor of Sderot and the Tkuma Directorate on the city's recovery since October 7th.",
              he: "עבודה עם ראש עיריית שדרות ומינהלת תקומה על שיקום העיר, מאז 7 באוקטובר.",
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
        en: "Founder of Starwell Holdings. Senior advisor to the Mayor of Sderot. Tel Aviv and Los Angeles.",
        he: "מייסד סטארוול הולדינגס. יועץ בכיר לראש עיריית שדרות. תל אביב ולוס אנג'לס.",
      },
    },
    blocks: [
      {
        id: "about-short-bio",
        type: "text",
        heading: { en: "Short bio", he: "ביו קצר" },
        body: {
          en: `<p>Amit Kochavi is an entrepreneur and investor, and the founder of <a href="https://starwellholdings.com/en/" target="_blank" rel="noopener">Starwell Holdings</a> — a Tel Aviv holding company with three arms: technology, real estate, and investments. Through it he acquires and builds Israeli IT services companies, continues his family's fourth-generation real estate business — residential, logistics, commercial, and office properties in Israel and the United States — and advises on large urban projects, including Rova 7, an 890-home development in Jaffa. Since October 2023 he has served as senior advisor to the Mayor of Sderot, working with the Tkuma Directorate in the Prime Minister's Office on the city's recovery — including a new ₪500M technology faculty at Sapir Academic College and a ₪100M program relocating tech families to the region. He founded his first company, Cormi, at 21, and serves on the boards of the Buchman Heyman Foundation and the Herb &amp; Sharon Glaser Foundation. A descendant of Max Factor Sr., he is a member of Voice of the People, the President of Israel's council on the future of the Jewish people, and lives between Tel Aviv and Los Angeles.</p>`,
          he: `<p>עמית כוכבי הוא יזם ומשקיע, מייסד <a href="https://starwellholdings.com/he/" target="_blank" rel="noopener">סטארוול הולדינגס</a> (Starwell Holdings) — חברת אחזקות תל־אביבית עם שלוש זרועות: טכנולוגיה, נדל"ן והשקעות. דרכה הוא רוכש ובונה חברות שירותי IT בישראל, ממשיך את עסקי הנדל"ן המשפחתיים זה ארבעה דורות — מגורים, לוגיסטיקה, מסחר ומשרדים בישראל ובארה"ב — ומלווה פרויקטים עירוניים גדולים, בהם רובע 7 ביפו, פרויקט של כ-890 יחידות דיור. מאז אוקטובר 2023 הוא משמש יועץ בכיר לראש עיריית שדרות ופועל עם מינהלת תקומה במשרד ראש הממשלה על שיקום העיר וצמיחתה — בין היתר פקולטה חדשה לטכנולוגיה במכללה האקדמית ספיר בתקציב של כ-500 מיליון ש"ח, ותוכנית של 100 מיליון ש"ח להעברת משפחות הייטק לאזור. את החברה הראשונה שלו, Cormi, הקים בגיל 21, והוא חבר דירקטוריון בקרן בוכמן־היימן ובקרן הרברט ושרון גלייזר. צאצא של מקס פקטור האב, חבר ב"קול העם" — מועצת נשיא המדינה לעתיד העם היהודי — וחי בין תל אביב ללוס אנג'לס.</p>`,
        },
      },
      {
        id: "about-story",
        type: "text",
        heading: { en: "My story", he: "הסיפור שלי" },
        body: {
          en: `<p>I was born in Tel Aviv on December 10, 1997, and grew up between Tel Aviv and Los Angeles.</p>
<p>I'm a fourth-generation entrepreneur. Real estate is the family business: four generations of developing and owning residential, logistics, commercial, and office properties in Israel and the United States. One side of my family also goes back to Max Factor Sr., who left Łódź with a trade, opened a shop in Los Angeles, and turned his own name into one of the best-known brands in the world. The rule I grew up on: what you inherit matters less than what you build yourself.</p>
<p>In March 2019, at 21, I founded my first company, Circles. We launched an innovation-management platform, sold it to our first customers, and failed. We rebuilt the company as Cormi — a forms and workflow platform for construction and manufacturing businesses — backed by Israeli investors, including the owner of Tidhar, one of Israel's largest construction groups. Cormi is still running today.</p>
<p>Now I run <a href="https://starwellholdings.com/en/" target="_blank" rel="noopener">Starwell Holdings</a>, built around three arms. The technology arm acquires established Israeli IT services companies — profitable businesses with 20 to 50 employees — and upgrades them with AI. The real estate arm continues the family business and advises on large urban projects; right now, Rova 7 in Jaffa: about 890 homes and commercial space, developed by Kardan Real Estate and Realty Fund. The investments arm manages the group's capital in Israel and the U.S. The full picture is on the <a href="/en/business">Business page</a>.</p>
<p>October 7, 2023 changed my direction. Since then I've served as senior advisor to the Mayor of Sderot, working with the Tkuma Directorate in the Prime Minister's Office on the city's recovery and growth: a new ₪500M technology faculty at Sapir Academic College, a ₪100M program bringing tech families to the region, a Rimon music school, and seven bilingual kindergartens. The details are on the <a href="/en/public-service">Public Service page</a>. It's the most meaningful work I've done.</p>
<p>Alongside that, I serve on the boards of two of my family's foundations — the Buchman Heyman Foundation, founded in 1942, and the Herb &amp; Sharon Glaser Foundation — and I'm a member of TAU Aurion, Tel Aviv University's next-generation leadership community, and of Voice of the People, the President of Israel's council on the future of the Jewish people.</p>
<p>I believe in free markets, strong security, a pluralistic Israel, and a close bond between Israel and Jewish communities around the world. And I believe the way to lead in Israel is to do the work first.</p>`,
          he: `<p>נולדתי בתל אביב ב-10 בדצמבר 1997, וגדלתי בין תל אביב ללוס אנג'לס.</p>
<p>אני דור רביעי של יזמים. נדל"ן הוא העסק המשפחתי: ארבעה דורות של יזמות ובעלות בתחומי המגורים, הלוגיסטיקה, המסחר והמשרדים — בישראל ובארצות הברית. צד אחד של המשפחה גם מגיע עד מקס פקטור האב, שעזב את לודז' עם מקצוע ביד, פתח חנות בלוס אנג'לס, והפך את השם הפרטי שלו לאחד המותגים המוכרים בעולם. הכלל שגדלתי עליו: מה שאתה יורש חשוב פחות ממה שאתה בונה בעצמך.</p>
<p>במרץ 2019, בגיל 21, הקמתי את החברה הראשונה שלי, Circles. השקנו פלטפורמה לניהול חדשנות, מכרנו ללקוחות הראשונים — ונכשלנו. בנינו את החברה מחדש כ-Cormi, פלטפורמת טפסים ותהליכי עבודה לחברות בנייה וייצור, בגיבוי משקיעים ישראלים ובהם הבעלים של תדהר, מקבוצות הבנייה הגדולות בישראל. Cormi פועלת עד היום.</p>
<p>היום אני מנהל את <a href="https://starwellholdings.com/he/" target="_blank" rel="noopener">סטארוול הולדינגס</a>, שבנויה משלוש זרועות. זרוע הטכנולוגיה רוכשת חברות שירותי IT ותיקות בישראל — עסקים רווחיים עם 20 עד 50 עובדים — ומשדרגת אותן עם AI. זרוע הנדל"ן ממשיכה את העסק המשפחתי ומלווה פרויקטים עירוניים גדולים; כרגע — רובע 7 ביפו: כ-890 יחידות דיור ושטחי מסחר, של קרדן נדל"ן וריאליטי קרן השקעות. זרוע ההשקעות מנהלת את ההון של הקבוצה בישראל ובארה"ב. התמונה המלאה בעמוד <a href="/he/business">עסקים</a>.</p>
<p>7 באוקטובר 2023 שינה את הכיוון שלי. מאז אני יועץ בכיר לראש עיריית שדרות, ועובד עם מינהלת תקומה במשרד ראש הממשלה על השיקום והצמיחה של העיר: פקולטה חדשה לטכנולוגיה במכללה האקדמית ספיר בתקציב של כ-500 מיליון ש"ח, תוכנית של 100 מיליון ש"ח להבאת משפחות הייטק לאזור, בית ספר למוזיקה של רימון, ושבעה גני ילדים דו־לשוניים. הפרטים בעמוד <a href="/he/public-service">שירות ציבורי</a>. זו העבודה המשמעותית ביותר שעשיתי.</p>
<p>לצד זה אני חבר דירקטוריון בשתיים מקרנות המשפחה — קרן בוכמן־היימן, שנוסדה ב-1942, וקרן הרברט ושרון גלייזר — וחבר ב-TAU Aurion, קהילת המנהיגות הצעירה של אוניברסיטת תל אביב, וב"קול העם", מועצת נשיא המדינה לעתיד העם היהודי.</p>
<p>אני מאמין בשוק חופשי, בביטחון חזק, בישראל פלורליסטית ובקשר הדוק בין ישראל לקהילות היהודיות בעולם. ואני מאמין שהדרך להנהיג בישראל היא קודם כול לעשות את העבודה.</p>`,
        },
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
      title: { en: "Business", he: "עסקים" },
      subtitle: {
        en: "One holding company. Three arms: technology, real estate, investments.",
        he: "חברת אחזקות אחת. שלוש זרועות: טכנולוגיה, נדל\"ן, השקעות.",
      },
    },
    blocks: [
      {
        id: "biz-opening",
        type: "text",
        body: {
          en: `<p><a href="https://starwellholdings.com/en/" target="_blank" rel="noopener">Starwell Holdings</a> is my holding company, based in Tel Aviv. Three arms — technology, real estate, and investments — alongside Cormi, the company I founded at 21.</p>`,
          he: `<p><a href="https://starwellholdings.com/he/" target="_blank" rel="noopener">סטארוול הולדינגס</a> היא חברת האחזקות שלי, יושבת בתל אביב. שלוש זרועות — טכנולוגיה, נדל"ן והשקעות — לצד Cormi, החברה שהקמתי בגיל 21.</p>`,
        },
      },
      {
        id: "biz-technology",
        type: "text",
        heading: {
          en: "The technology arm — buying and building Israeli IT companies",
          he: "זרוע הטכנולוגיה — רכישה ובנייה של חברות IT ישראליות",
        },
        body: {
          en: `<p>Through Starwell's technology arm, we acquire established IT services and managed services (MSP) companies in Israel.</p>
<p>What we look for:</p>
<ul><li>Revenue of ₪10–30 million and 20–50 employees</li><li>Long-standing business clients on recurring service contracts</li><li>Owners planning retirement or their next chapter</li></ul>
<p>The thesis: these are good businesses run the old way. AI is changing how much a service team can deliver per person, and what clients will ask of their IT provider. We buy the company, keep the team and the clients, and upgrade the operation — automation inside, and new lines for the existing client base: ERP and CRM implementation, AI agents, and cybersecurity.</p>
<p>We buy to own and operate for the long term — not to flip.</p>
<p>If you own an Israeli IT services company and the next chapter is on your mind, I want to hear from you. <a href="/en/contact">Contact me →</a></p>`,
          he: `<p>דרך זרוע הטכנולוגיה של סטארוול אנחנו רוכשים חברות ותיקות לשירותי IT ושירותים מנוהלים (MSP) בישראל.</p>
<p>מה אנחנו מחפשים:</p>
<ul><li>הכנסות של 10–30 מיליון ש"ח ו-20–50 עובדים</li><li>לקוחות עסקיים ותיקים בחוזי שירות מתמשכים</li><li>בעלים שמתכננים פרישה או פרק הבא</li></ul>
<p>התזה: אלה עסקים טובים שמנוהלים בשיטה הישנה. ה-AI משנה כמה צוות שירות יכול לספק לכל עובד, ומה לקוחות יבקשו מספק ה-IT שלהם. אנחנו קונים את החברה, שומרים על הצוות ועל הלקוחות, ומשדרגים את התפעול — אוטומציה בפנים, וקווי מוצר חדשים ללקוחות הקיימים: הטמעות ERP ו-CRM, סוכני AI, וסייבר.</p>
<p>אנחנו קונים כדי להחזיק ולתפעל לטווח ארוך — לא כדי למכור הלאה.</p>
<p>יש לך חברת שירותי IT בישראל, והפרק הבא על השולחן? דברו איתי. <a href="/he/contact">צור קשר ←</a></p>`,
        },
      },
      {
        id: "biz-realestate",
        type: "text",
        heading: {
          en: "The real estate arm — the family business, fourth generation",
          he: "זרוע הנדל\"ן — העסק המשפחתי, דור רביעי",
        },
        body: {
          en: `<p>Real estate is my family's business. Four generations of developing and owning residential, logistics, commercial, and office properties — in Israel and the United States. Today the arm works on the family's projects and advises developers on large, complex urban projects.</p>
<p>Current engagement: Rova 7 — the HaPalach compound in Givat Herzl, Jaffa. Around 890 homes plus commercial space, developed by Kardan Real Estate and Realty Fund, with construction starting in 2027. My scope: work with the municipality, project branding, the commercial mix, and how technology is built into the project.</p>`,
          he: `<p>נדל"ן הוא העסק של המשפחה שלי. ארבעה דורות של יזמות ובעלות בנכסי מגורים, לוגיסטיקה, מסחר ומשרדים — בישראל ובארצות הברית. היום הזרוע עובדת על הפרויקטים של המשפחה ומלווה יזמים בפרויקטים עירוניים גדולים ומורכבים.</p>
<p>הפרויקט הנוכחי: רובע 7 — מתחם הפלח בגבעת הרצל, יפו. כ-890 יחידות דיור ושטחי מסחר, של קרדן נדל"ן וריאליטי קרן השקעות, עם תחילת בנייה ב-2027. תחומי האחריות שלי: העבודה מול העירייה, מיתוג הפרויקט, התמהיל המסחרי, ושילוב הטכנולוגיה בפרויקט.</p>`,
        },
      },
      {
        id: "biz-investments",
        type: "text",
        heading: { en: "The investments arm", he: "זרוע ההשקעות" },
        body: {
          en: `<p>The investments arm manages the group's capital: public markets and private positions, in Israel and the United States, held for the long term.</p>`,
          he: `<p>זרוע ההשקעות מנהלת את ההון של הקבוצה: שוק ההון ופוזיציות פרטיות, בישראל ובארצות הברית, לטווח ארוך.</p>`,
        },
      },
      {
        id: "biz-cormi",
        type: "text",
        heading: {
          en: "Cormi (Circles Ltd.) — my first company",
          he: "Cormi (Circles Ltd.) — החברה הראשונה שלי",
        },
        body: {
          en: `<p>Founded in March 2019, when I was 21. We started with an innovation-management platform, sold it, and failed — then rebuilt the company as Cormi, a forms and workflow platform for construction and manufacturing businesses. Investors include the owner of Tidhar, one of Israel's largest construction groups. Cormi is also the exclusive Israel partner of Doss, an American AI-native ERP.</p>`,
          he: `<p>נוסדה במרץ 2019, כשהייתי בן 21. התחלנו עם פלטפורמה לניהול חדשנות, מכרנו — ונכשלנו. בנינו את החברה מחדש כ-Cormi, פלטפורמת טפסים ותהליכי עבודה לחברות בנייה וייצור. בין המשקיעים: הבעלים של תדהר, מקבוצות הבנייה הגדולות בישראל. Cormi היא גם השותפה הבלעדית בישראל של Doss, חברת ERP אמריקאית מבוססת AI.</p>`,
        },
      },
      {
        id: "biz-facts",
        type: "stat",
        items: [
          {
            value: { en: "4", he: "4" },
            label: { en: "Generations in real estate", he: "דורות בנדל\"ן" },
          },
          {
            value: { en: "₪10–30M", he: "10–30 מ׳" },
            label: {
              en: "Revenue range we acquire",
              he: "טווח ההכנסות שאנחנו רוכשים",
            },
          },
          {
            value: { en: "890", he: "890" },
            label: {
              en: "Homes in the current advisory project",
              he: "יחידות דיור בפרויקט הליווי הנוכחי",
            },
          },
        ],
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
        en: "Four generations. Two board seats.",
        he: "ארבעה דורות. שני מושבי דירקטוריון.",
      },
    },
    blocks: [
      {
        id: "phil-opening",
        type: "text",
        body: {
          en: `<p>My family has been giving for four generations — in Israel and in Los Angeles. I grew up with it as a responsibility, not a title: board meetings, budgets, grant decisions, and follow-through. Today I serve on the boards of two of our family foundations.</p>`,
          he: `<p>המשפחה שלי נותנת כבר ארבעה דורות — בישראל ובלוס אנג'לס. גדלתי על זה כאחריות, לא כתואר: ישיבות דירקטוריון, תקציבים, החלטות על מענקים, ומעקב עד הסוף. היום אני חבר דירקטוריון בשתיים מקרנות המשפחה.</p>`,
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
              en: "Founded in 1942 by Sara Buchman. I serve on the board.",
              he: "נוסדה ב-1942 על ידי שרה בוכמן. אני חבר דירקטוריון.",
            },
          },
          {
            title: {
              en: "The Herb & Sharon Glaser Foundation",
              he: "קרן הרברט ושרון גלייזר",
            },
            body: {
              en: "Established in Los Angeles by my grandparents, Herbert and Sharon Glaser. I serve on the board.",
              he: "הוקמה בלוס אנג'לס על ידי סבי וסבתי, הרברט ושרון גלייזר. אני חבר דירקטוריון.",
            },
          },
          {
            title: {
              en: "The Max Factor Family Foundation",
              he: "קרן משפחת מקס פקטור",
            },
            body: {
              en: "Our family's foundation in Los Angeles, continuing giving that began with Max Factor Sr.",
              he: "קרן המשפחה בלוס אנג'לס, שממשיכה נתינה שהתחילה אצל מקס פקטור האב.",
            },
          },
          {
            title: { en: "TAU Aurion", he: "TAU Aurion" },
            body: {
              en: "I'm a member of Aurion, Tel Aviv University's next-generation leadership community.",
              he: "אני חבר ב-Aurion, קהילת המנהיגות הצעירה של אוניברסיטת תל אביב.",
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
      title: { en: "Public Service", he: "שירות ציבורי" },
      subtitle: {
        en: "Sderot. Since October 7th.",
        he: "שדרות. מאז 7 באוקטובר.",
      },
    },
    blocks: [
      {
        id: "ps-opening",
        type: "text",
        body: {
          en: `<p>After October 7, 2023, I joined the Mayor of Sderot as a senior advisor. I work with city hall and with the Tkuma Directorate in the Prime Minister's Office on the city's recovery and growth. The job in practice: turning ideas into funded, running projects — planning, budgets, government offices, donors, execution.</p>`,
          he: `<p>אחרי 7 באוקטובר 2023 הצטרפתי לראש עיריית שדרות כיועץ בכיר. אני עובד עם העירייה ועם מינהלת תקומה במשרד ראש הממשלה על השיקום והצמיחה של העיר. העבודה בפועל: להפוך רעיונות לפרויקטים מתוקצבים ורצים — תכנון, תקציבים, משרדי ממשלה, תורמים, ביצוע.</p>`,
        },
      },
      {
        id: "ps-projects",
        type: "cards",
        heading: {
          en: "Projects since October 7th",
          he: "פרויקטים מאז 7 באוקטובר",
        },
        items: [
          {
            title: {
              en: "Faculty of Technology, Sapir Academic College",
              he: "פקולטה לטכנולוגיה, המכללה האקדמית ספיר",
            },
            body: {
              en: "Part of the founding team of a new technology faculty in Sderot — a 15,000 m² (≈161,500 sq ft) campus next to the train station, with a budget of about ₪500 million.",
              he: "חלק מהצוות המקים של פקולטה חדשה לטכנולוגיה בשדרות — קמפוס של 15,000 מ\"ר (כ-161,500 רגל רבוע) ליד תחנת הרכבת, בתקציב של כ-500 מיליון ש\"ח.",
            },
          },
          {
            title: {
              en: "Tech relocation to Sderot and the Gaza Envelope",
              he: "רילוקיישן הייטק לשדרות ולעוטף",
            },
            body: {
              en: "A ₪100 million program bringing tech workers and their families from central Israel to the region — more than 400 families.",
              he: "תוכנית של 100 מיליון ש\"ח להבאת עובדי הייטק ומשפחותיהם ממרכז הארץ לאזור — יותר מ-400 משפחות.",
            },
          },
          {
            title: { en: "Rimon Music School", he: "בית ספר למוזיקה רימון" },
            body: {
              en: "A new Rimon music school in Sderot, with a budget of about ₪30 million.",
              he: "בית ספר חדש למוזיקה של רימון בשדרות, בתקציב של כ-30 מיליון ש\"ח.",
            },
          },
          {
            title: {
              en: "Seven bilingual kindergartens",
              he: "שבעה גני ילדים דו־לשוניים",
            },
            body: {
              en: "Seven Hebrew–English kindergartens across the city.",
              he: "שבעה גנים בעברית ובאנגלית ברחבי העיר.",
            },
          },
          {
            title: { en: "Voice of the People", he: "קול העם" },
            body: {
              en: "Beyond Sderot: I'm a member of Voice of the People, the President of Israel's council on the future of the Jewish people, which brings together members from Israel and Jewish communities around the world.",
              he: "מעבר לשדרות: אני חבר ב\"קול העם\", מועצת נשיא המדינה לעתיד העם היהודי, שמפגישה חברים מישראל ומקהילות יהודיות ברחבי העולם.",
            },
          },
        ],
      },
      {
        id: "ps-closing",
        type: "text",
        body: {
          en: `<p>This is the longest-term work I do, and the most important.</p>`,
          he: `<p>זו העבודה הכי ארוכת־טווח שאני עושה — והכי חשובה.</p>`,
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
