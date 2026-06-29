import type { ReactNode } from "react";
import Link from "next/link";
import { SignOutButton } from "./SignOutButton";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/media", label: "Media & Writing" },
  { href: "/admin/settings", label: "Site Settings" },
];

export function AdminShell({
  email,
  children,
}: {
  email?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="flex shrink-0 flex-col gap-6 bg-ink p-6 text-cream md:w-64">
        <div>
          <p className="font-serif text-xl font-bold text-white">Dashboard</p>
          <p className="mt-1 text-xs text-cream/70">{email}</p>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-3 py-2 text-sm font-medium text-cream/90 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <Link
            href="/en"
            target="_blank"
            className="text-sm text-cream/80 hover:text-white"
          >
            View site ↗
          </Link>
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 bg-cream p-6 md:p-10">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
