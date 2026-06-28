import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "he"],
  defaultLocale: "en",
  // Always prefix the locale (/en, /he). `/` redirects to `/en`.
  // This gives unambiguous canonical + hreflang URLs, which is best for SEO
  // and for earning Google sitelinks.
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];
