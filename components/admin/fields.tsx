'use client';

export function TextField({
  label,
  value,
  onChange,
  textarea,
  rows = 3,
  dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
  dir?: 'ltr' | 'rtl';
}) {
  const base =
    'w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand';
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
        {label}
      </span>
      {textarea ? (
        <textarea
          dir={dir}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      ) : (
        <input dir={dir} value={value} onChange={(e) => onChange(e.target.value)} className={base} />
      )}
    </label>
  );
}

export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-wide text-ink">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
