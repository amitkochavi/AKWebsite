import Link from "next/link";

export const dynamic = "force-dynamic";

const PAGES: { key: string; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "business", label: "Business" },
  { key: "philanthropy", label: "Philanthropy" },
  { key: "public-service", label: "Public Service" },
  { key: "contact", label: "Contact" },
];

export default function PagesListPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Pages</h1>
      <p className="mt-1 text-sm text-muted">
        Edit each page’s hero and content sections.
      </p>
      <ul className="mt-6 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
        {PAGES.map((p) => (
          <li key={p.key}>
            <Link
              href={`/admin/pages/${p.key}`}
              className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-sand"
            >
              <span className="font-medium text-navy">{p.label}</span>
              <span className="text-sm text-gold-dark">Edit →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
