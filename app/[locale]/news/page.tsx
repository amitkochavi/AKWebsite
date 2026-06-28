import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent } from '@/lib/content';
import { isLocale, type Locale } from '@/lib/i18n';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageSections';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const content = await getContent(params.locale);
  const url = `${content.site.url}/${params.locale}/news`;
  return {
    title: content.news.title,
    description: content.news.lead,
    alternates: {
      canonical: url,
      languages: {
        en: `${content.site.url}/en/news`,
        he: `${content.site.url}/he/news`,
        'x-default': `${content.site.url}/en/news`,
      },
    },
  };
}

function formatDate(date: string, locale: Locale): string {
  try {
    return new Intl.DateTimeFormat(locale === 'he' ? 'he-IL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  } catch {
    return date;
  }
}

export default async function NewsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const content = await getContent(locale);
  const posts = [...content.news.posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: content.nav.home, url: `${content.site.url}/${locale}` },
          { name: content.news.title, url: `${content.site.url}/${locale}/news` },
        ]}
      />
      <PageHero eyebrow={content.nav.news} title={content.news.title} lead={content.news.lead} />
      <section className="container-content py-14">
        <div className="divide-y divide-ink/10">
          {posts.map((post) => (
            <article key={post.slug} className="py-8 first:pt-0">
              <p className="text-sm text-ink-soft">{formatDate(post.date, locale)}</p>
              <h2 className="mt-2 text-2xl font-semibold">
                <Link href={`/${locale}/news/${post.slug}`} className="hover:text-brand">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{post.excerpt}</p>
              <Link
                href={`/${locale}/news/${post.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
              >
                {locale === 'he' ? 'קראו עוד' : 'Read more'}
              </Link>
            </article>
          ))}
          {posts.length === 0 && (
            <p className="py-8 text-ink-soft">
              {locale === 'he' ? 'אין עדכונים עדיין.' : 'No updates yet.'}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
