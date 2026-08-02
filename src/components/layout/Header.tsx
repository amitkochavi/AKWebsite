"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/lib/constants";

export function Header({ siteName }: { siteName: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="border-b border-line py-6">
      <Link href="/" className="text-lg font-semibold text-ink">
        {siteName}
      </Link>
      <nav
        aria-label="Primary"
        className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm"
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "text-accent underline underline-offset-4"
                  : "text-ink hover:text-accent"
              }
            >
              {t(item.key)}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
