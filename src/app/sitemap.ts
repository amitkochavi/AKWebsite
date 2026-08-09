import type { MetadataRoute } from "next";
import { localeUrl } from "@/lib/constants";
import { getMediaItems } from "@/lib/content";

// Nav order: About, Public Service, Business, Philanthropy, Media, Books, Contact.
const STATIC_PATHS = [
  "",
  "/about",
  "/public-service",
  "/business",
  "/philanthropy",
  "/media",
  "/books",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const media = await getMediaItems();
  const detailPaths = media
    .filter((m) => !m.external_url && m.kind !== "reading")
    .map((m) => `/media/${m.slug}`);
  const paths = [...STATIC_PATHS, ...detailPaths];
  const lastModified = new Date();

  // List both language versions of every page as their own entry, each one
  // cross-referencing the other plus x-default (the Hebrew root), which is the
  // format Google recommends for hreflang sitemaps.
  const entries: MetadataRoute.Sitemap = [];
  for (const p of paths) {
    const languages = {
      "he-IL": localeUrl("he", p),
      en: localeUrl("en", p),
      "x-default": localeUrl("he", p),
    };
    const priority = p === "" ? 1 : p.startsWith("/media/") ? 0.6 : 0.8;
    for (const loc of ["he", "en"] as const) {
      entries.push({
        url: localeUrl(loc, p),
        lastModified,
        changeFrequency: "weekly",
        priority,
        alternates: { languages },
      });
    }
  }
  return entries;
}
