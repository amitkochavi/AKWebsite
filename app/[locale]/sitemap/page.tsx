import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContent } from '@/lib/content';
import { isLocale, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const content = await getContent(params.locale);
  return {
    title: content.nav.sitemap,
    description: `${content.nav.sitemap} — ${content.site.name}`,
    alternates: { canonical: `${content.site.url}/${params.locale}/sitemap` },
  };
}

export default async function SitemapPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const content = await getContent(locale);
  const { nav, news } = content;

  const groups = [
    {
      title: content.site.name,
      links: [
        { href: `/${locale}`, label: nav.home },
        { href: `/${locale}/business`, label: nav.business },
        { href: `/${locale}/philanthropy`, label: nav.philanthropy },
        { href: `/${locale}/public-service`, label: nav.publicService },
      ],
    },
    {
      title: nav.news,
      links: [
        { href: `/${locale}/news`, label: nav.news },
        ...news.posts.map((p) => ({ href: `/${locale}/news/${p.slug}`, label: p.title })),
      ],
    },
    {
      title: nav.contact,
      links: [
        { href: `/${locale}/contact`, label: nav.contact },
        { href: `/${locale === 'en' ? 'he' : 'en'}`, label: locale === 'en' ? 'עברית' : 'English' },
      ],
    },
  ];

  return (
    <section className="container-content py-16">
      <p className="eyebrow">{nav.sitemap}</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">{nav.sitemap}</h1>
      <div className="mt-12 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ink">{group.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ink-soft hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
