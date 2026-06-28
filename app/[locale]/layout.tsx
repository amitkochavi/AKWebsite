import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersonJsonLd } from '@/components/JsonLd';
import { getContent } from '@/lib/content';
import { isLocale, locales, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const content = await getContent(params.locale);
  const { site } = content;
  const url = `${site.url}/${params.locale}`;

  return {
    title: {
      absolute: `${site.name} | ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    alternates: {
      canonical: url,
      languages: {
        en: `${site.url}/en`,
        he: `${site.url}/he`,
        'x-default': `${site.url}/en`,
      },
    },
    openGraph: {
      type: 'profile',
      title: `${site.name} | ${site.tagline}`,
      description: site.description,
      url,
      siteName: site.name,
      locale: params.locale === 'he' ? 'he_IL' : 'en_US',
      images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.name} | ${site.tagline}`,
      description: site.description,
      images: [site.ogImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const content = await getContent(locale);

  return (
    <>
      <PersonJsonLd content={content} locale={locale} />
      <Header content={content} locale={locale} />
      <main id="main">{children}</main>
      <Footer content={content} locale={locale} />
    </>
  );
}
