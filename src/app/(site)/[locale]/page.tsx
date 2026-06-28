import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageView } from "@/components/sections/PageView";
import { LatestMedia } from "@/components/sections/LatestMedia";
import { pageMetadata } from "@/lib/page-meta";
import type { Locale } from "@/types/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("home", "/", locale as Locale);
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  return (
    <>
      <PageView pageKey="home" path="/" locale={l} />
      <LatestMedia locale={l} />
    </>
  );
}
