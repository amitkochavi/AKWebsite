import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getMediaItems } from "@/lib/content";
import { pick } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Locale } from "@/types/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "books" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/books",
    title: `${t("title")} | Amit Kochavi`,
    description: t("intro"),
  });
}

export default async function BooksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations("books");

  const books = (await getMediaItems())
    .filter((m) => m.kind === "reading")
    .sort((a, b) => a.sort_order - b.sort_order);

  return (
    <>
      <section>
        <h1>{t("title")}</h1>
        <hr className="title-rule" aria-hidden />
        <p className="text-lg leading-relaxed text-muted">{t("intro")}</p>
      </section>

      <div className="mt-10">
        {books.length === 0 ? (
          <p className="text-muted">{t("empty")}</p>
        ) : (
          <ol className="divide-y divide-line border-t border-line">
            {books.map((b) => (
              <li key={b.id} className="py-4">
                <span className="block font-semibold text-ink">
                  {pick(b.title, l)}
                </span>
                <span className="mt-0.5 block text-sm text-muted">
                  {pick(b.excerpt, l)}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>

      <JsonLd
        data={breadcrumbSchema(
          [
            { name: "Home", path: "/" },
            { name: t("title"), path: "/books" },
          ],
          l,
        )}
      />
    </>
  );
}
