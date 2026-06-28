import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { Container } from "../ui/Container";
import type { SocialLink } from "@/types/content";

export function Footer({
  siteName,
  tagline,
  socialLinks,
}: {
  siteName: string;
  tagline: string;
  socialLinks: SocialLink[];
}) {
  const t = useTranslations();
  const year = 2026;

  return (
    <footer className="mt-20 border-t border-line bg-navy text-sand">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-serif text-2xl font-bold text-white">{siteName}</p>
          <p className="mt-2 max-w-sm text-sm text-sand/80">{tagline}</p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">
            {t("footer.sections")}
          </p>
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-sm text-sand/85 transition-colors hover:text-white"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {socialLinks.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">
              {t("footer.connect")}
            </p>
            <ul className="space-y-2">
              {socialLinks.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sand/85 transition-colors hover:text-white"
                  >
                    {s.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>

      <div className="border-t border-white/10 py-5">
        <Container>
          <p className="text-xs text-sand/70">
            © {year} {siteName}. {t("footer.rights")}
          </p>
        </Container>
      </div>
    </footer>
  );
}
