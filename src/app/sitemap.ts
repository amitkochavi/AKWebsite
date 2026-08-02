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

  // Canonical entry is the Hebrew (default, root) URL; English is an alternate.
  return paths.map((p) => ({
    url: localeUrl("he", p),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
    alternates: {
      languages: {
        "he-IL": localeUrl("he", p),
        en: localeUrl("en", p),
      },
    },
  }));
}
