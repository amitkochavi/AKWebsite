import { pick } from "@/lib/i18n";
import type { Hero as HeroType, Locale } from "@/types/content";

export function Hero({ hero, locale }: { hero: HeroType; locale: Locale }) {
  const title = pick(hero.title, locale);
  const subtitle = pick(hero.subtitle, locale);

  return (
    <section>
      <h1>{title}</h1>
      <hr className="title-rule" aria-hidden />
      {subtitle && (
        <p className="text-lg leading-relaxed text-muted">{subtitle}</p>
      )}
    </section>
  );
}
