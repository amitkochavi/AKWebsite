import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getMediaItem, getMediaItems, getSettings } from "@/lib/content";
import { pick } from "@/lib/i18n";
import { linkifyBody } from "@/lib/linkify";
import {
  articleSchema,
  breadcrumbSchema,
  buildMetadata,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/types/content";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const items = await getMediaItems();
  // Only site-native items get a detail page; books live on /books and press
  // items link out to their source.
  return routing.locales.flatMap((locale) =>
    items
      .filter((m) => !m.external_url && m.kind !== "reading")
      .map((m) => ({ locale, slug: m.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = await getMediaItem(slug);
  if (!item) return {};
  const l = locale as Locale;
  return buildMetadata({
    locale: l,
    path: `/media/${slug}`,
    title: `${pick(item.title, l)} | Amit Kochavi`,
    description: pick(item.excerpt, l),
    image: item.cover_image,
  });
}

export default async function MediaItemPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const [item, settings, t] = await Promise.all([
    getMediaItem(slug),
    getSettings(),
    getTranslations(),
  ]);
  if (!item) notFound();

  const body = pick(item.body, l);
  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(body);

  return (
    <article>
      <section>
        <p className="section-heading">{item.kind}</p>
        <h1 className="mt-2">{pick(item.title, l)}</h1>
        <hr className="title-rule" aria-hidden />
        {item.published_at && (
          <time className="block text-sm text-muted" dateTime={item.published_at}>
            {item.published_at}
          </time>
        )}
      </section>

      <div className="mt-10">
        <p className="mb-6 text-lg leading-relaxed text-ink">
          {pick(item.excerpt, l)}
        </p>
        <div
          className="prose-content leading-relaxed text-ink"
          dangerouslySetInnerHTML={{ __html: linkifyBody(body, looksLikeHtml) }}
        />

        {item.external_url && (
          <p className="mt-8">
            <a
              href={item.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-dark"
            >
              {t("media.external")} →
            </a>
          </p>
        )}

        <div className="mt-12">
          <Link href="/media" className="text-accent hover:text-accent-dark">
            ← {t("common.backToMedia")}
          </Link>
        </div>
      </div>

      <JsonLd
        data={[
          articleSchema(item, settings, l),
          breadcrumbSchema(
            [
              { name: "Home", path: "/" },
              { name: t("media.title"), path: "/media" },
              { name: pick(item.title, l), path: `/media/${slug}` },
            ],
            l,
          ),
        ]}
      />
    </article>
  );
}
