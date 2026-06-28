import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getMediaItems } from "@/lib/content";

const STATIC_PATHS = [
  "",
  "/about",
  "/business",
  "/philanthropy",
  "/public-service",
  "/media",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const media = await getMediaItems();
  const paths = [...STATIC_PATHS, ...media.map((m) => `/media/${m.slug}`)];

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
