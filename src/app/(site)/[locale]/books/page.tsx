import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getMediaItems } from "@/lib/content";
import { pick } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Locale } from "@/types/content";

const ACCENTS = ["#e8843a", "#9b6dff", "#1fb6a6", "#f45d9e", "#4c8df6", "#f4b740"];

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
      <section className="border-b border-line bg-white">
        <Container className="py-14 sm:py-20">
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {t("intro")}
          </p>
        </Container>
      </section>

      <Container className="py-12">
        {books.length === 0 ? (
          <p className="text-muted">{t("empty")}</p>
        ) : (
          <ol className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {books.map((b, i) => (
              <li
                key={b.id}
                className="flex items-start gap-4 border-b border-line pb-5"
              >
                <span
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: ACCENTS[i % ACCENTS.length] }}
                  aria-hidden
                />
                <span>
                  <span className="block font-semibold text-ink">
                    {pick(b.title, l)}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">
                    {pick(b.excerpt, l)}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        )}
      </Container>

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
