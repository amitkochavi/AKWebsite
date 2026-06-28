import type { Metadata } from "next";
import { getPage, getSettings } from "./content";
import { buildMetadata, pageSeo } from "./seo";
import type { Locale, PageKey } from "@/types/content";

/** Builds full SEO metadata for a database-backed page route. */
export async function pageMetadata(
  key: PageKey,
  path: string,
  locale: Locale,
): Promise<Metadata> {
  const [page, settings] = await Promise.all([getPage(key), getSettings()]);
  if (!page) return {};
  const { title, description, image } = pageSeo(page, settings, locale);
  return buildMetadata({ locale, path, title, description, image });
}
