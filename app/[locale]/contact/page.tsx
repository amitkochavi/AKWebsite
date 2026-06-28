import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContent } from '@/lib/content';
import { isLocale, type Locale } from '@/lib/i18n';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { ContactForm } from '@/components/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const content = await getContent(params.locale);
  const url = `${content.site.url}/${params.locale}/contact`;
  return {
    title: content.contact.title,
    description: content.contact.intro,
    alternates: {
      canonical: url,
      languages: {
        en: `${content.site.url}/en/contact`,
        he: `${content.site.url}/he/contact`,
        'x-default': `${content.site.url}/en/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const content = await getContent(locale);
  const c = content.contact;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: content.nav.home, url: `${content.site.url}/${locale}` },
          { name: c.title, url: `${content.site.url}/${locale}/contact` },
        ]}
      />
      <section className="border-b border-ink/10 bg-gradient-to-b from-white to-paper">
        <div className="container-content py-16 sm:py-20">
          <p className="eyebrow">{content.nav.contact}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{c.title}</h1>
          <p className="mt-5 max-w-2xl prose-body">{c.intro}</p>
        </div>
      </section>

      <section className="container-content grid gap-12 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold">{c.emailLabel}</h2>
          <a
            href={`mailto:${content.site.email}`}
            className="mt-2 inline-block text-lg text-brand link-underline"
          >
            {content.site.email}
          </a>
          <p className="mt-6 text-ink-soft">{content.site.location}</p>
        </div>
        <ContactForm content={content} />
      </section>
    </>
  );
}
