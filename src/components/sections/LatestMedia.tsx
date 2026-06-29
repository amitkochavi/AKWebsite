import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getMediaItems } from "@/lib/content";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/types/content";
import { Container } from "../ui/Container";

export async function LatestMedia({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const items = (await getMediaItems())
    .filter((m) => m.kind !== "reading")
    .slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section className="py-16">
      <Container>
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-bold sm:text-3xl">{t("media.title")}</h2>
          <Link
            href="/media"
            className="shrink-0 text-sm font-semibold text-brand-dark hover:underline"
          >
            {t("common.allArticles")} →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {items.map((m) => {
            const inner = (
              <>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-dark">
                  {m.kind}
                </p>
                <h3 className="mt-2 text-lg font-bold text-ink">
                  {pick(m.title, locale)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {pick(m.excerpt, locale)}
                </p>
              </>
            );
            const cls =
              "group block rounded-2xl border border-line p-6 transition-shadow hover:shadow-md";
            return m.external_url ? (
              <a
                key={m.id}
                href={m.external_url}
                target="_blank"
                rel="noopener"
                className={cls}
              >
                {inner}
              </a>
            ) : (
              <Link key={m.id} href={`/media/${m.slug}`} className={cls}>
                {inner}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
