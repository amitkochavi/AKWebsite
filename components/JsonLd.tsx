import type { SiteContent } from '@/lib/types';
import type { Locale } from '@/lib/i18n';

const SITE_URL = 'https://amitkochavi.com';

interface Props {
  content: SiteContent;
  locale: Locale;
}

/**
 * Structured data drives Google's understanding of who Amit Kochavi is
 * (Person + knowledge panel), the site itself (WebSite + sitelinks searchbox),
 * and the organization. Rendered server-side on every page.
 */
export function PersonJsonLd({ content, locale }: Props) {
  const { site } = content;
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Amit Kochavi',
    alternateName: ['Amit L. Kochavi', site.name],
    url: SITE_URL,
    description: site.description,
    jobTitle: locale === 'he' ? 'יזם ופילנתרופ' : 'Entrepreneur & Philanthropist',
    nationality: 'Israeli',
    knowsLanguage: ['en', 'he'],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IL',
    },
    knowsAbout: [
      'Business',
      'Investment',
      'Philanthropy',
      'Public Service',
      'Technology',
      'Real Estate',
      'Sderot',
    ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Amit Kochavi',
    description: site.description,
    inLanguage: ['en', 'he'],
    publisher: { '@id': `${SITE_URL}/#person` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/en/news?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  date,
  url,
}: {
  title: string;
  description: string;
  date: string;
  url: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    url,
    author: { '@type': 'Person', name: 'Amit Kochavi', '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
    mainEntityOfPage: url,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
