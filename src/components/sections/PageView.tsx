import { notFound } from "next/navigation";
import { getPage, getSettings } from "@/lib/content";
import { pick } from "@/lib/i18n";
import { breadcrumbSchema } from "@/lib/seo";
import type { Locale, PageKey } from "@/types/content";
import { Hero } from "./Hero";
import { BlockRenderer } from "./BlockRenderer";
import { JsonLd } from "../seo/JsonLd";

/** Renders a database page (hero + content blocks) plus breadcrumb JSON-LD. */
export async function PageView({
  pageKey,
  path,
  locale,
}: {
  pageKey: PageKey;
  path: string;
  locale: Locale;
}) {
  const page = await getPage(pageKey);
  if (!page) notFound();

  // The homepage shows Amit's round profile photo (from Settings) above the name.
  const avatar =
    pageKey === "home"
      ? (await getSettings()).person_schema.image
      : undefined;

  return (
    <>
      <Hero hero={page.hero} locale={locale} avatar={avatar} />
      <BlockRenderer blocks={page.blocks} locale={locale} />
      {path !== "/" && (
        <JsonLd
          data={breadcrumbSchema(
            [
              { name: "Home", path: "/" },
              { name: pick(page.title, locale), path },
            ],
            locale,
          )}
        />
      )}
    </>
  );
}
