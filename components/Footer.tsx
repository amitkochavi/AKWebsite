import Link from 'next/link';
import type { SiteContent } from '@/lib/types';
import type { Locale } from '@/lib/i18n';

export function Footer({ content, locale }: { content: SiteContent; locale: Locale }) {
  const { nav, site, footer } = content;
  const year = 2026;

  const cols = [
    {
      title: site.name,
      links: [
        { href: `/${locale}/business`, label: nav.business },
        { href: `/${locale}/philanthropy`, label: nav.philanthropy },
        { href: `/${locale}/public-service`, label: nav.publicService },
      ],
    },
    {
      title: nav.news,
      links: [
        { href: `/${locale}/news`, label: nav.news },
        { href: `/${locale}/contact`, label: nav.contact },
        { href: `/${locale}/sitemap`, label: nav.sitemap },
      ],
    },
  ];

  return (
    <footer className="mt-24 border-t border-ink/10 bg-white">
      <div className="container-content grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm font-bold text-white">
              AK
            </span>
            <span className="text-base font-semibold">{site.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">{site.description}</p>
          <p className="mt-4 text-sm text-ink-soft">
            <a href={`mailto:${site.email}`} className="link-underline">
              {site.email}
            </a>
          </p>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-soft hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ink/10">
        <div className="container-content flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-soft sm:flex-row">
          <p>
            © {year} {site.name}. {footer.rights}
          </p>
          <p>{footer.builtNote}</p>
        </div>
      </div>
    </footer>
  );
}
