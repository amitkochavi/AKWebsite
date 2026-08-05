import Image from "next/image";
import { pick } from "@/lib/i18n";
import type { Hero as HeroType, Locale } from "@/types/content";

export function Hero({
  hero,
  locale,
  avatar,
}: {
  hero: HeroType;
  locale: Locale;
  avatar?: string;
}) {
  const title = pick(hero.title, locale);
  const subtitle = pick(hero.subtitle, locale);

  return (
    <section>
      {avatar && (
        <Image
          src={avatar}
          alt={title}
          width={176}
          height={176}
          priority
          className="mb-6 h-28 w-28 rounded-full object-cover sm:h-36 sm:w-36"
        />
      )}
      <h1>{title}</h1>
      <hr className="title-rule" aria-hidden />
      {subtitle && (
        <p className="text-lg leading-relaxed text-muted">{subtitle}</p>
      )}
    </section>
  );
}
