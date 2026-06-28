import type { Metadata } from "next";
import { SITE_URL } from "./constants";
import { pick } from "./i18n";
import type {
  Locale,
  MediaItem,
  Page,
  SiteSettings,
} from "@/types/content";

const SITE_NAME = "Amit Kochavi";

function cleanPath(path: string) {
  if (path === "/" || path === "") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

/** Per-page metadata incl. canonical, hreflang alternates, OG, Twitter. */
export function buildMetadata(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const { locale, path, title, description, image } = opts;
  const c = cleanPath(path);
  const url = `${SITE_URL}/${locale}${c}`;
  // When a page has no explicit image, omit it so Next falls back to the
  // file-based opengraph-image convention.
  const images = image
    ? [{ url: image, width: 1200, height: 630, alt: title }]
    : undefined;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en${c}`,
        he: `${SITE_URL}/he${c}`,
        "x-default": `${SITE_URL}/en${c}`,
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: locale === "he" ? "he_IL" : "en_US",
      alternateLocale: locale === "he" ? "en_US" : "he_IL",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

/** Resolve a page's effective SEO title/description (override → defaults). */
export function pageSeo(page: Page, settings: SiteSettings, locale: Locale) {
  const title =
    pick(page.seo?.title, locale) ||
    `${pick(page.title, locale)} | ${SITE_NAME}`;
  const description =
    pick(page.seo?.description, locale) ||
    pick(settings.seo_defaults.description, locale);
  return { title, description, image: page.seo?.og_image };
}

/* ── JSON-LD builders ─────────────────────────────────────────────────── */

export function personSchema(settings: SiteSettings, locale: Locale) {
  const p = settings.person_schema;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    alternateName: p.alternateName,
    url: SITE_URL,
    jobTitle: pick(p.jobTitle, locale),
    description: pick(p.description, locale),
    image: p.image,
    sameAs: p.sameAs,
    knowsAbout: p.knowsAbout,
  };
}

export function websiteSchema(settings: SiteSettings, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: pick(settings.site_name, locale),
    url: SITE_URL,
    inLanguage: locale === "he" ? "he-IL" : "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/${locale}/media?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${cleanPath(item.path)}`,
    })),
  };
}

export function articleSchema(
  item: MediaItem,
  settings: SiteSettings,
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pick(item.title, locale),
    description: pick(item.excerpt, locale),
    image: item.cover_image,
    datePublished: item.published_at ?? undefined,
    inLanguage: locale === "he" ? "he-IL" : "en-US",
    author: {
      "@type": "Person",
      name: settings.person_schema.name,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/${locale}/media/${item.slug}`,
  };
}
