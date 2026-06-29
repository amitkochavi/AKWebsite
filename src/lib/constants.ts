import { routing } from "@/i18n/routing";

export const LOCALES = routing.locales;
export const DEFAULT_LOCALE = routing.defaultLocale;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://amitkochavi.com"
).replace(/\/$/, "");

/**
 * Top-level navigation. Order and labels are intentionally stable and
 * descriptive — clean, consistent nav is one of the strongest signals for
 * earning Google sitelinks.
 */
export const NAV_ITEMS = [
  { key: "about", href: "/about" },
  { key: "business", href: "/business" },
  { key: "philanthropy", href: "/philanthropy" },
  { key: "publicService", href: "/public-service" },
  { key: "books", href: "/books" },
  { key: "media", href: "/media" },
  { key: "contact", href: "/contact" },
] as const;

/** Cache tags for on-demand revalidation when the dashboard saves. */
export const CACHE_TAGS = {
  settings: "settings",
  pages: "pages",
  media: "media",
} as const;
