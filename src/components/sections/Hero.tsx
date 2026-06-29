import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/i18n";
import type { Hero as HeroType, Locale } from "@/types/content";
import { Container } from "../ui/Container";

const ACCENTS = ["#e8843a", "#9b6dff", "#1fb6a6", "#f45d9e", "#4c8df6"];

export function Hero({ hero, locale }: { hero: HeroType; locale: Locale }) {
  const title = pick(hero.title, locale);
  const subtitle = pick(hero.subtitle, locale);
  const cta = pick(hero.cta_label, locale);

  return (
    <section className="border-b border-line bg-white">
      <Container className="py-16 sm:py-24">
        <div className="flex gap-2" aria-hidden>
          {ACCENTS.map((c) => (
            <span
              key={c}
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {subtitle}
          </p>
        )}
        {cta && hero.cta_href && (
          <Link
            href={hero.cta_href}
            className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
          >
            {cta}
          </Link>
        )}
      </Container>
    </section>
  );
}
