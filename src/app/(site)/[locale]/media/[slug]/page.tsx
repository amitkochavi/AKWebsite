import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getMediaItem, getMediaItems, getSettings } from "@/lib/content";
import { pick } from "@/lib/i18n";
import {
  articleSchema,
  breadcrumbSchema,
  buildMetadata,
} from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/types/content";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const items = await getMediaItems();
  return routing.locales.flatMap((locale) =>
    items.map((m) => ({ locale, slug: m.slug })),
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
      <section className="border-b border-line bg-white">
        <Container className="py-14 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-dark">
            {item.kind}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {pick(item.title, l)}
          </h1>
          {item.published_at && (
            <time className="mt-3 block text-sm text-muted" dateTime={item.published_at}>
              {item.published_at}
            </time>
          )}
        </Container>
      </section>

      <Container className="py-12">
        <p className="mb-6 max-w-2xl text-lg leading-relaxed text-ink">
          {pick(item.excerpt, l)}
        </p>
        <div className="prose-content max-w-2xl leading-relaxed text-ink">
          {looksLikeHtml ? (
            <div dangerouslySetInnerHTML={{ __html: body }} />
          ) : (
            <p>{body}</p>
          )}
        </div>

        {item.external_url && (
          <a
            href={item.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded bg-brand px-5 py-2.5 text-sm font-semibold text-ink hover:bg-brand-dark hover:text-white"
          >
            {t("media.external")} →
          </a>
        )}

        <div className="mt-12">
          <Link
            href="/media"
            className="text-sm font-semibold text-brand-dark hover:underline"
          >
            ← {t("common.backToMedia")}
          </Link>
        </div>
      </Container>

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
