import { routing } from "@/i18n/routing";

export const LOCALES = routing.locales;
export const DEFAULT_LOCALE = routing.defaultLocale;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://amitkochavi.com"
).replace(/\/$/, "");

/**
 * Absolute-path for a locale under the "as-needed" scheme: the default locale
 * (he) has no prefix, English is under /en.
 *   localePath("he", "/about") -> "/about"
 *   localePath("en", "/about") -> "/en/about"
 *   localePath("he", "/")      -> "/"
 */
export function localePath(locale: string, path: string) {
  const clean = path === "/" || path === "" ? "" : path;
  if (locale === DEFAULT_LOCALE) return clean || "/";
  return `/en${clean}`;
}

/** Full URL for a locale + path. */
export function localeUrl(locale: string, path: string) {
  const p = localePath(locale, path);
  return `${SITE_URL}${p === "/" ? "" : p}` || SITE_URL;
}

/**
 * Top-level navigation. Public Service comes before Business everywhere.
 */
export const NAV_ITEMS = [
  { key: "about", href: "/about" },
  { key: "publicService", href: "/public-service" },
  { key: "business", href: "/business" },
  { key: "philanthropy", href: "/philanthropy" },
  { key: "media", href: "/media" },
  { key: "books", href: "/books" },
  { key: "contact", href: "/contact" },
] as const;

/** Cache tags for on-demand revalidation when the dashboard saves. */
export const CACHE_TAGS = {
  settings: "settings",
  pages: "pages",
  media: "media",
} as const;
