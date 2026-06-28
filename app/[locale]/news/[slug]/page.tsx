import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent } from '@/lib/content';
import { isLocale, locales, type Locale } from '@/lib/i18n';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const content = await getContent(locale);
    for (const post of content.news.posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const content = await getContent(params.locale);
  const post = content.news.posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  const url = `${content.site.url}/${params.locale}/news/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
      languages: {
        en: `${content.site.url}/en/news/${post.slug}`,
        he: `${content.site.url}/he/news/${post.slug}`,
        'x-default': `${content.site.url}/en/news/${post.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
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

export default async function NewsPostPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const content = await getContent(locale);
  const post = content.news.posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const url = `${content.site.url}/${locale}/news/${post.slug}`;

  return (
    <article className="container-content py-16">
      <ArticleJsonLd title={post.title} description={post.excerpt} date={post.date} url={url} />
      <BreadcrumbJsonLd
        items={[
          { name: content.nav.home, url: `${content.site.url}/${locale}` },
          { name: content.news.title, url: `${content.site.url}/${locale}/news` },
          { name: post.title, url },
        ]}
      />
      <Link href={`/${locale}/news`} className="text-sm font-semibold text-brand hover:underline">
        ← {content.news.title}
      </Link>
      <p className="mt-6 text-sm text-ink-soft">{formatDate(post.date, locale)}</p>
      <h1 className="mt-2 max-w-3xl text-4xl font-bold leading-tight tracking-tight">{post.title}</h1>
      <div className="mt-8 max-w-2xl flow text-lg leading-relaxed text-ink-soft">
        {post.body.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
