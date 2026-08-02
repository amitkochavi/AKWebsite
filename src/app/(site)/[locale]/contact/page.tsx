import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPage, getSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/page-meta";
import { Hero } from "@/components/sections/Hero";
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
  const [page, settings] = await Promise.all([
    getPage("contact"),
    getSettings(),
  ]);
  if (!page) notFound();
  const email = settings.contact_email || "contact@amitkochavi.com";

  return (
    <>
      <Hero hero={page.hero} locale={l} />
      <div className="mt-10 space-y-3 text-lg">
        <p>
          <a
            href={`mailto:${email}`}
            className="text-accent hover:text-accent-dark"
          >
            {email}
          </a>
        </p>
        <p>
          <a
            href="https://x.com/AmitKochavi"
            target="_blank"
            rel="noopener"
            className="text-accent hover:text-accent-dark"
          >
            @AmitKochavi
          </a>
        </p>
      </div>
    </>
  );
}
