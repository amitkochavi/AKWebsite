import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPage, getSettings } from "@/lib/content";
import { pick } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-meta";
import { breadcrumbSchema } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { BlockRenderer } from "@/components/sections/BlockRenderer";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Locale } from "@/types/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("about", "/about", locale as Locale);
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const [page, settings] = await Promise.all([getPage("about"), getSettings()]);
  if (!page) notFound();

  const photo = settings.person_schema.image;
  const name = pick(settings.site_name, l);

  return (
    <>
      <Hero hero={page.hero} locale={l} />
      {photo && (
        <Container className="pt-12">
          <div className="relative h-56 w-44 overflow-hidden rounded-2xl border border-line shadow-sm">
            <Image
              src={photo}
              alt={name}
              fill
              sizes="176px"
              className="object-cover"
              priority
            />
          </div>
        </Container>
      )}
      <BlockRenderer blocks={page.blocks} locale={l} />
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "Home", path: "/" },
            { name: pick(page.title, l), path: "/about" },
          ],
          l,
        )}
      />
    </>
  );
}
