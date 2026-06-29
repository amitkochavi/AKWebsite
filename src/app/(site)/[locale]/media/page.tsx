import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getMediaItems } from "@/lib/content";
import { pick } from "@/lib/i18n";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
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
  const items = (await getMediaItems()).filter((m) => m.kind !== "reading");

  return (
    <>
      <section className="border-b border-line bg-white">
        <Container className="py-14 sm:py-20">
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {t("media.title")}
          </h1>
        </Container>
      </section>

      <Container className="py-14">
        {items.length === 0 ? (
          <p className="text-muted">{t("media.empty")}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((m) => {
              const inner = (
                <>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-dark">
                    {m.kind}
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-ink">
                    {pick(m.title, l)}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {pick(m.excerpt, l)}
                  </p>
                  {m.published_at && (
                    <time
                      className="mt-4 text-xs text-muted"
                      dateTime={m.published_at}
                    >
                      {m.published_at}
                    </time>
                  )}
                </>
              );
              const cls =
                "group flex flex-col rounded-2xl border border-line p-6 transition-shadow hover:shadow-md";
              // External coverage links out to the original source; site-native
              // items open their detail page.
              return m.external_url ? (
                <a
                  key={m.id}
                  href={m.external_url}
                  target="_blank"
                  rel="noopener"
                  className={cls}
                >
                  {inner}
                  <span className="mt-3 text-sm font-semibold text-brand-dark">
                    {t("media.external")} ↗
                  </span>
                </a>
              ) : (
                <Link key={m.id} href={`/media/${m.slug}`} className={cls}>
                  {inner}
                </Link>
              );
            })}
          </div>
        )}
      </Container>

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
