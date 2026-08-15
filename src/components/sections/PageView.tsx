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
  outbound,
}: {
  pageKey: PageKey;
  path: string;
  locale: Locale;
  outbound?: { href: string; label: string };
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
      {outbound && (
        <p className="mt-8">
          <a
            href={outbound.href}
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-dark"
          >
            {outbound.label}
          </a>
        </p>
      )}
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
