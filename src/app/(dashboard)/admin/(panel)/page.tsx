import Link from "next/link";

export const dynamic = "force-dynamic";

const CARDS = [
  {
    href: "/admin/pages",
    title: "Pages",
    desc: "Edit the homepage and the About, Business, Philanthropy, Public Service, and Contact pages.",
  },
  {
    href: "/admin/media",
    title: "Media & Writing",
    desc: "Add and manage articles, press coverage, and writing.",
  },
  {
    href: "/admin/settings",
    title: "Site Settings",
    desc: "Name, tagline, contact details, social links, and SEO defaults.",
  },
];

export default function AdminHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome back</h1>
      <p className="mt-1 text-sm text-muted">
        Choose a section to edit. Every text field can be edited in both English
        and Hebrew. Changes go live within a minute.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-xl border border-line bg-white p-6 transition-shadow hover:shadow-md"
          >
            <h2 className="text-lg font-bold text-ink">{c.title}</h2>
            <p className="mt-2 text-sm text-muted">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
