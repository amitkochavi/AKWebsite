import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPage, getSettings } from "@/lib/content";
import { pick } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-meta";
import { Hero } from "@/components/sections/Hero";
import { BlockRenderer } from "@/components/sections/BlockRenderer";
import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/types/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("contact", "/contact", locale as Locale);
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const [page, settings] = await Promise.all([getPage("contact"), getSettings()]);
  if (!page) notFound();

  return (
    <>
      <Hero hero={page.hero} locale={l} />
      <BlockRenderer blocks={page.blocks} locale={l} />
      <Container className="pb-20">
        <ContactForm />
        {settings.contact_email && (
          <p className="mt-8 text-sm text-muted">
            <a
              href={`mailto:${settings.contact_email}`}
              className="font-medium text-gold-dark hover:underline"
            >
              {settings.contact_email}
            </a>
          </p>
        )}
      </Container>
    </>
  );
}
