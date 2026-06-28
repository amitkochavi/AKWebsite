import Link from 'next/link';
import { getContent } from '@/lib/content';
import { isLocale, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

const pillarHref: Record<string, string> = {
  business: 'business',
  philanthropy: 'philanthropy',
  'public-service': 'public-service',
};

export default async function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const content = await getContent(locale);
  const { hero, intro, pillars } = content;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-ink text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/40 via-ink to-ink" />
        <div className="container-content relative py-24 sm:py-32">
          <p className="eyebrow text-gold">{hero.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            {hero.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href={`/${locale}/business`} className="btn bg-gold text-ink hover:bg-gold/90">
              {hero.primaryCta}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="btn border border-white/30 text-white hover:bg-white hover:text-ink"
            >
              {hero.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="container-content py-20">
        <p className="eyebrow">{content.site.tagline}</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          {intro.title}
        </h2>
        <p className="mt-5 max-w-3xl prose-body">{intro.body}</p>
      </section>

      {/* Pillars */}
      <section className="container-content pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <Link
              key={pillar.id}
              href={`/${locale}/${pillarHref[pillar.id] ?? pillar.id}`}
              className="card-link group"
            >
              <h3 className="text-xl font-semibold group-hover:text-brand">{pillar.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{pillar.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                {pillar.cta}
                <span aria-hidden className="transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
