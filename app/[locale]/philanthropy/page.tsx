import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContent } from '@/lib/content';
import { isLocale, type Locale } from '@/lib/i18n';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { PageHero, IntroBlock, SectionGrid, BackToContact } from '@/components/PageSections';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const content = await getContent(params.locale);
  const url = `${content.site.url}/${params.locale}/philanthropy`;
  return {
    title: content.philanthropy.title,
    description: content.philanthropy.intro.slice(0, 155),
    alternates: {
      canonical: url,
      languages: {
        en: `${content.site.url}/en/philanthropy`,
        he: `${content.site.url}/he/philanthropy`,
        'x-default': `${content.site.url}/en/philanthropy`,
      },
    },
  };
}

export default async function PhilanthropyPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const content = await getContent(locale);
  const p = content.philanthropy;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: content.nav.home, url: `${content.site.url}/${locale}` },
          { name: p.title, url: `${content.site.url}/${locale}/philanthropy` },
        ]}
      />
      <PageHero eyebrow={content.nav.philanthropy} title={p.title} lead={p.lead} />
      <IntroBlock>{p.intro}</IntroBlock>
      <SectionGrid sections={p.sections} />
      <BackToContact href={`/${locale}/contact`} label={content.nav.contact} />
    </>
  );
}
