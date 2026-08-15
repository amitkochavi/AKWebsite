import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageView } from "@/components/sections/PageView";
import { pageMetadata } from "@/lib/page-meta";
import type { Locale } from "@/types/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata("business", "/business", locale as Locale);
}

export default async function BusinessPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const outbound = {
    href: "https://starwellholdings.com",
    label: l === "he" ? "אתר סטארוול הולדינגס ↗" : "Starwell Holdings ↗",
  };
  return (
    <PageView
      pageKey="business"
      path="/business"
      locale={l}
      outbound={outbound}
    />
  );
}
