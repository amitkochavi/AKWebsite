import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n";
import type { Hero as HeroType, Locale } from "@/types/content";
import { Container } from "../ui/Container";

export function Hero({ hero, locale }: { hero: HeroType; locale: Locale }) {
  const title = pick(hero.title, locale);
  const subtitle = pick(hero.subtitle, locale);
  const cta = pick(hero.cta_label, locale);

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(60% 60% at 80% 0%, var(--color-gold) 0%, transparent 60%)",
        }}
      />
      <Container className="relative py-20 sm:py-28">
        <h1 className="max-w-3xl text-4xl font-bold !text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sand/85">
            {subtitle}
          </p>
        )}
        {cta && hero.cta_href && (
          <Link
            href={hero.cta_href}
            className="mt-8 inline-block rounded bg-gold px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-white"
          >
            {cta}
          </Link>
        )}
      </Container>
    </section>
  );
}
