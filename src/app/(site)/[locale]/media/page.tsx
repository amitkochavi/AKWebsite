import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getMediaItems } from "@/lib/content";
import { pick } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { pageDescription } from "@/lib/page-descriptions";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Locale, MediaItem } from "@/types/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const t = await getTranslations({ locale, namespace: "media" });
  const suffix = l === "he" ? "עמית כוכבי" : "Amit Kochavi";
  return buildMetadata({
    locale: l,
    path: "/media",
    title: `${t("title")} | ${suffix}`,
    description: pageDescription("media", l) ?? t("title"),
  });
}

/** Newest first; items without a date sort last. */
function byDateDesc(a: MediaItem, b: MediaItem) {
  const da = a.published_at ?? "";
  const db = b.published_at ?? "";
  if (da && db) return db.localeCompare(da);
  if (da) return -1;
  if (db) return 1;
  return a.sort_order - b.sort_order;
}

function Row({ item, locale }: { item: MediaItem; locale: Locale }) {
  const year = item.published_at ? item.published_at.slice(0, 4) : "";
  const inner = (
    <span className="flex items-start justify-between gap-3 py-4">
      <span className="min-w-0">
        <span className="block font-semibold text-ink">
          {pick(item.title, locale)}
        </span>
        <span className="mt-0.5 block text-sm text-muted">
          {pick(item.excerpt, locale)}
          {year ? ` · ${year}` : ""}
        </span>
      </span>
      <span className="shrink-0 pt-0.5 text-sm text-accent">↗</span>
    </span>
  );
  return (
    <li>
      {item.external_url ? (
        <a
          href={item.external_url}
          target="_blank"
          rel="noopener"
          className="block hover:text-accent"
        >
          {inner}
        </a>
      ) : (
        <Link href={`/media/${item.slug}`} className="block hover:text-accent">
          {inner}
        </Link>
      )}
    </li>
  );
}

export default async function MediaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations();
  // Books live on the dedicated /books page.
  const items = (await getMediaItems()).filter((m) => m.kind !== "reading");

  const groups = [
    {
      key: "recognition",
      label: t("media.recognition"),
      items: items.filter((m) => m.kind === "recognition").sort(byDateDesc),
    },
    {
      key: "writing",
      label: t("media.writing"),
      items: items.filter((m) => m.kind === "writing").sort(byDateDesc),
    },
    {
      key: "coverage",
      label: t("media.coverage"),
      items: items
        .filter((m) => m.kind !== "recognition" && m.kind !== "writing")
        .sort(byDateDesc),
    },
  ].filter((g) => g.items.length > 0);

  return (
    <>
      <section>
        <h1>{t("media.title")}</h1>
        <hr className="title-rule" aria-hidden />
      </section>

      {items.length === 0 ? (
        <p className="mt-10 text-muted">{t("media.empty")}</p>
      ) : (
        groups.map((g) => (
          <section key={g.key} className="mt-10">
            <h2 className="section-heading">{g.label}</h2>
            <ul className="mt-3 divide-y divide-line border-t border-line">
              {g.items.map((m) => (
                <Row key={m.id} item={m} locale={l} />
              ))}
            </ul>
          </section>
        ))
      )}

      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "Home", path: "/" },
            { name: t("media.title"), path: "/media" },
          ],
          l,
        )}
      />
    </>
  );
}
