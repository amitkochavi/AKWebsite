import type { Metadata } from "next";
import { getPage, getSettings } from "./content";
import { buildMetadata, pageSeo } from "./seo";
import { pageDescription } from "./page-descriptions";
import type { Locale, PageKey } from "@/types/content";

/** Builds full SEO metadata for a database-backed page route. */
export async function pageMetadata(
  key: PageKey,
  path: string,
  locale: Locale,
  titleOverride?: string,
): Promise<Metadata> {
  const [page, settings] = await Promise.all([getPage(key), getSettings()]);
  if (!page) return {};
  const seo = pageSeo(page, settings, locale);
  const title = titleOverride ?? seo.title;
  // Prefer the unique, hand-authored per-page description over the DB default.
  const segment = path.replace(/^\//, "");
  const description = pageDescription(segment, locale) ?? seo.description;
  return buildMetadata({ locale, path, title, description, image: seo.image });
}
