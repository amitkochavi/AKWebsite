import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Hebrew is the default and lives at the root (/). English lives at /en.
  locales: ["he", "en"],
  defaultLocale: "he",
  // The default locale (he) has no prefix; only English carries /en.
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
