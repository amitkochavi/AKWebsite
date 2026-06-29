import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getMediaItems } from "@/lib/content";

const STATIC_PATHS = [
  "",
  "/about",
  "/business",
  "/philanthropy",
  "/public-service",
  "/books",
  "/media",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const media = await getMediaItems();
  const detailPaths = media
    .filter((m) => !m.external_url && m.kind !== "reading")
    .map((m) => `/media/${m.slug}`);
  const paths = [...STATIC_PATHS, ...detailPaths];

  return paths.map((p) => ({
    url: `${SITE_URL}/en${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
    alternates: {
      languages: {
        en: `${SITE_URL}/en${p}`,
        he: `${SITE_URL}/he${p}`,
      },
    },
  }));
}
