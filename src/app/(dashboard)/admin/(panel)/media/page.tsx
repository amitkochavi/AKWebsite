import Link from "next/link";
import { loadAllMedia } from "@/lib/admin-data";
import { pick } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function MediaListPage() {
  const items = await loadAllMedia();
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Media & Writing</h1>
        <Link
          href="/admin/media/new"
          className="rounded bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink-soft"
        >
          + New item
        </Link>
      </div>
      <ul className="mt-6 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
        {items.map((m) => (
          <li key={m.id}>
            <Link
              href={`/admin/media/${m.id}`}
              className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-cream"
            >
              <span>
                <span className="font-medium text-ink">
                  {pick(m.title, "en") || "(untitled)"}
                </span>
                <span className="ms-2 text-xs uppercase tracking-wide text-brand-dark">
                  {m.kind}
                </span>
              </span>
              <span className="flex items-center gap-3 text-sm">
                {!m.is_published && (
                  <span className="rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
                    Draft
                  </span>
                )}
                <span className="text-brand-dark">Edit →</span>
              </span>
            </Link>
          </li>
        ))}
        {items.length === 0 && (
          <li className="px-6 py-6 text-sm text-muted">No items yet.</li>
        )}
      </ul>
    </div>
  );
}
