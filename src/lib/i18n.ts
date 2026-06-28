import type { Locale, Localized } from "@/types/content";

/** Returns the text for `locale`, falling back to English then Hebrew. */
export function pick(field: Localized | undefined, locale: Locale): string {
  if (!field) return "";
  return field[locale] || field.en || field.he || "";
}

/** Text direction for a locale. */
export function dir(locale: Locale): "ltr" | "rtl" {
  return locale === "he" ? "rtl" : "ltr";
}

export function isRtl(locale: Locale): boolean {
  return locale === "he";
}
