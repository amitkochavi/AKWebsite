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
  const url = `${content.site.url}/${params.locale}/public-service`;
  return {
    title: content.publicService.title,
    description: content.publicService.intro.slice(0, 155),
    alternates: {
      canonical: url,
      languages: {
        en: `${content.site.url}/en/public-service`,
        he: `${content.site.url}/he/public-service`,
        'x-default': `${content.site.url}/en/public-service`,
      },
    },
  };
}

export default async function PublicServicePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const content = await getContent(locale);
  const p = content.publicService;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: content.nav.home, url: `${content.site.url}/${locale}` },
          { name: p.title, url: `${content.site.url}/${locale}/public-service` },
        ]}
      />
      <PageHero eyebrow={content.nav.publicService} title={p.title} lead={p.lead} />
      <IntroBlock>{p.intro}</IntroBlock>
      <SectionGrid sections={p.sections} />
      <BackToContact href={`/${locale}/contact`} label={content.nav.contact} />
    </>
  );
}
