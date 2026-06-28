import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageView } from "@/components/sections/PageView";
import { pageMetadata } from "@/lib/page-meta";
import type { Locale } from "@/types/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("philanthropy", "/philanthropy", locale as Locale);
}

export default async function PhilanthropyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <PageView
      pageKey="philanthropy"
      path="/philanthropy"
      locale={locale as Locale}
    />
  );
}
