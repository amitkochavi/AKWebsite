import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageView } from "@/components/sections/PageView";
import { pageMetadata } from "@/lib/page-meta";
import { getSettings } from "@/lib/content";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/types/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  // The homepage title is always just the name (Amit Kochavi / עמית כוכבי),
  // regardless of any stored SEO title, so search results show the name alone.
  const settings = await getSettings();
  return pageMetadata("home", "/", l, pick(settings.site_name, l));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PageView pageKey="home" path="/" locale={locale as Locale} />;
}
