import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContent } from '@/lib/content';
import { isLocale, type Locale } from '@/lib/i18n';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import {
  PageHero,
  IntroBlock,
  SectionGrid,
  CalloutBlock,
  BackToContact,
} from '@/components/PageSections';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const content = await getContent(params.locale);
  const url = `${content.site.url}/${params.locale}/business`;
  return {
    title: content.business.title,
    description: content.business.intro.slice(0, 155),
    alternates: {
      canonical: url,
      languages: {
        en: `${content.site.url}/en/business`,
        he: `${content.site.url}/he/business`,
        'x-default': `${content.site.url}/en/business`,
      },
    },
  };
}

export default async function BusinessPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const content = await getContent(locale);
  const b = content.business;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: content.nav.home, url: `${content.site.url}/${locale}` },
          { name: b.title, url: `${content.site.url}/${locale}/business` },
        ]}
      />
      <PageHero eyebrow={content.nav.business} title={b.title} lead={b.lead} />
      <IntroBlock>{b.intro}</IntroBlock>
      <SectionGrid sections={b.sections} />
      <CalloutBlock title={b.philosophyTitle} body={b.philosophy} />
      <BackToContact href={`/${locale}/contact`} label={content.nav.contact} />
    </>
  );
}
