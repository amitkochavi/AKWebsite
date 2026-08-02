import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getMediaItems } from "@/lib/content";
import { pick } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Locale } from "@/types/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "media" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/media",
    title: `${t("title")} | Amit Kochavi`,
    description: t("title"),
  });
}

export default async function MediaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations();
  // Books live on the dedicated /books page.
  const items = (await getMediaItems())
    .filter((m) => m.kind !== "reading")
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <>
      <section>
        <h1>{t("media.title")}</h1>
        <hr className="title-rule" aria-hidden />
      </section>

      <div className="mt-10">
        {items.length === 0 ? (
          <p className="text-muted">{t("media.empty")}</p>
        ) : (
          <ul className="divide-y divide-line border-t border-line">
            {items.map((m) => {
              const row = (
                <span className="flex items-start justify-between gap-3 py-4">
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink">
                      {pick(m.title, l)}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {pick(m.excerpt, l)}
                    </span>
                  </span>
                  <span className="shrink-0 pt-0.5 text-sm text-accent">↗</span>
                </span>
              );
              return (
                <li key={m.id}>
                  {m.external_url ? (
                    <a
                      href={m.external_url}
                      target="_blank"
                      rel="noopener"
                      className="block hover:text-accent"
                    >
                      {row}
                    </a>
                  ) : (
                    <Link href={`/media/${m.slug}`} className="block hover:text-accent">
                      {row}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

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
