'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { SiteContent } from '@/lib/types';
import { Locale, otherLocale, localeConfig } from '@/lib/i18n';

interface Props {
  content: SiteContent;
  locale: Locale;
}

export function Header({ content, locale }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { nav } = content;

  const links = [
    { href: `/${locale}/business`, label: nav.business },
    { href: `/${locale}/philanthropy`, label: nav.philanthropy },
    { href: `/${locale}/public-service`, label: nav.publicService },
    { href: `/${locale}/news`, label: nav.news },
    { href: `/${locale}/contact`, label: nav.contact },
  ];

  // Swap the locale segment to build the alternate-language URL of the current page.
  const other = otherLocale(locale);
  const switchHref = pathname
    ? '/' + [other, ...pathname.split('/').slice(2)].join('/')
    : `/${other}`;

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/90 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-2" aria-label={content.site.name}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm font-bold text-white">
            AK
          </span>
          <span className="text-base font-semibold tracking-tight">{content.site.name}</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand ${
                  active ? 'text-brand' : 'text-ink-soft'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={switchHref}
            className="rounded-md border border-ink/20 px-3 py-1.5 text-sm font-medium hover:border-ink"
            hrefLang={other}
          >
            {localeConfig[other].label}
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-ink/10 bg-white md:hidden" aria-label="Mobile">
          <div className="container-content flex flex-col py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2.5 text-sm font-medium text-ink-soft"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={switchHref}
              className="py-2.5 text-sm font-semibold text-brand"
              hrefLang={other}
              onClick={() => setOpen(false)}
            >
              {localeConfig[other].label}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
