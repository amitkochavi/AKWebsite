import type { Locale } from "@/types/content";

/**
 * Unique meta description per page, in both languages (140-160 characters each,
 * no two alike). Authored in code so descriptions are stable and do not depend
 * on the database. Keyed by page path segment ("" is the homepage).
 */
export const PAGE_DESCRIPTIONS: Record<string, Record<Locale, string>> = {
  "": {
    en: "Amit Kochavi, Founder and CEO of Starwell Holdings and Senior Advisor to the Mayor of Sderot, building across technology, real estate and public service.",
    he: 'עמית כוכבי, מייסד ומנכ"ל סטארוול הולדינגס ויועץ בכיר לראש עיריית שדרות, הפועל בתחומי הטכנולוגיה, הנדל"ן, ההשקעות והשירות הציבורי בישראל ובלוס אנג\'לס.',
  },
  about: {
    en: "The story of Amit Kochavi: a fourth-generation entrepreneur and philanthropist, founder of Starwell Holdings and Senior Advisor to the Mayor of Sderot.",
    he: "הסיפור של עמית כוכבי, יזם ופילנתרופ דור רביעי, מייסד סטארוול הולדינגס, יועץ בכיר לראש עיריית שדרות וחבר מועצת קול העם של נשיא המדינה, הפועל בישראל ובלוס אנג'לס.",
  },
  business: {
    en: "Starwell Holdings, the private group founded by Amit Kochavi, operating across Starwell IT Services, real estate and investments in Israel and the US.",
    he: 'סטארוול הולדינגס, הקבוצה הפרטית שהקים עמית כוכבי, פועלת בתחומי Starwell IT Services, הנדל"ן וההשקעות בישראל ובארצות הברית, מתוך גישה של בעלות פעילה.',
  },
  philanthropy: {
    en: "More than eighty years of family giving across three foundations in Israel and Los Angeles: Buchman-Heyman, Herbert and Sharon Glaser, and Max Factor.",
    he: "למעלה משמונים שנה של נתינה משפחתית בשלוש קרנות בישראל ובלוס אנג'לס: קרן בוכמן-היימן, קרן הרברט ושרון גלזר וקרן משפחת מקס פקטור, בתחומי החינוך, הבריאות והקהילה.",
  },
  "public-service": {
    en: "Amit Kochavi, Senior Advisor to the Mayor of Sderot, on the city's recovery and growth with the Tkuma Directorate and the President's Kol HaAm Council.",
    he: "עמית כוכבי, יועץ בכיר לראש עיריית שדרות, על שיקום העיר וצמיחתה בעבודה מול מינהלת תקומה במשרד ראש הממשלה וחברותו במועצת קול העם של נשיא המדינה יצחק הרצוג.",
  },
  media: {
    en: "Press coverage, recognition and writing by and about Amit Kochavi, from The Forward and TheMarker to Calcalist, Globes and The Jerusalem Post.",
    he: "סיקור תקשורתי, הכרה וכתיבה מאת ועל עמית כוכבי, מהפורוורד, דה-מרקר וטיימס אוף ישראל ועד כלכליסט, גלובס, מקור ראשון, ישראל היום וג'רוזלם פוסט.",
  },
  books: {
    en: "A reading list from Amit Kochavi: the books on business, leadership, history and ideas that have shaped how he thinks, builds and works day to day.",
    he: "רשימת הקריאה של עמית כוכבי, מבחר הספרים על עסקים, מנהיגות, היסטוריה ורעיונות שעיצבו את דרך החשיבה, הבנייה והעבודה היומיומית שלו לאורך השנים.",
  },
  contact: {
    en: "Get in touch with Amit Kochavi by email, and connect on X and LinkedIn or through Starwell Holdings for media, partnership and speaking requests.",
    he: 'ליצירת קשר עם עמית כוכבי בדוא"ל, ולמעקב ולהתחברות ב-X ובלינקדאין או דרך אתר סטארוול הולדינגס, לפניות תקשורת, שיתופי פעולה, הרצאות ושותפויות.',
  },
};

/** Description for a page path segment + locale, if defined. */
export function pageDescription(
  key: string,
  locale: Locale,
): string | undefined {
  return PAGE_DESCRIPTIONS[key]?.[locale];
}
