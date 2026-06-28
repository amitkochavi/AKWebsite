import type { MetadataRoute } from 'next';
import { getContent } from '@/lib/content';
import { locales } from '@/lib/i18n';

const BASE = 'https://amitkochavi.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ['', '/business', '/philanthropy', '/public-service', '/news', '/contact', '/sitemap'];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const p of staticPaths) {
      entries.push({
        url: `${BASE}/${locale}${p}`,
        lastModified: new Date('2026-01-15'),
        changeFrequency: p === '' || p === '/news' ? 'weekly' : 'monthly',
        priority: p === '' ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${BASE}/en${p}`,
            he: `${BASE}/he${p}`,
          },
        },
      });
    }

    const content = await getContent(locale);
    for (const post of content.news.posts) {
      entries.push({
        url: `${BASE}/${locale}/news/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'yearly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
