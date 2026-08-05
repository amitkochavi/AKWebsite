import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, type AppLocale } from "@/i18n/routing";
import { dir, pick } from "@/lib/i18n";
import { getMediaItems, getSettings } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { JsonLd } from "@/components/seo/JsonLd";
import { personSchema, websiteSchema } from "@/lib/seo";
import type { Locale } from "@/types/content";
import "@/app/globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as AppLocale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const settings = await getSettings();
  const l = locale as Locale;
  const siteName = pick(settings.site_name, l);

  const press = (await getMediaItems())
    .filter((m) => m.external_url)
    .map((m) => ({ url: m.external_url as string, name: pick(m.title, l) }));

  return (
    <html lang={locale} dir={dir(l)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:p-2"
          >
            Skip to content
          </a>
          <div className="mx-auto flex min-h-screen max-w-[42rem] flex-col px-5">
            <Header siteName={siteName} />
            <main id="main" className="flex-1 py-10">
              {children}
            </main>
            <Footer siteName={siteName} />
          </div>
          <BackToTop />
        </NextIntlClientProvider>
        <JsonLd
          data={[personSchema(settings, l, press), websiteSchema(settings, l)]}
        />
      </body>
    </html>
  );
}
