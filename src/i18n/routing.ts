import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Hebrew is the default and lives at the root (/). English lives at /en.
  locales: ["he", "en"],
  defaultLocale: "he",
  // The default locale (he) has no prefix; only English carries /en.
  localePrefix: "as-needed",
  // Never redirect based on Accept-Language or a cookie: each URL always
  // serves the same language. hreflang tags and the switcher handle discovery.
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];
