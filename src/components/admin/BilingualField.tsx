"use client";

import type { Localized } from "@/types/content";

const EMPTY: Localized = { en: "", he: "" };

export function BilingualField({
  label,
  value,
  onChange,
  multiline = false,
  rows = 3,
}: {
  label: string;
  value?: Localized;
  onChange: (next: Localized) => void;
  multiline?: boolean;
  rows?: number;
}) {
  const v = value ?? EMPTY;
  const base =
    "w-full rounded border border-line bg-white px-3 py-2 text-sm text-ink focus:border-gold";

  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-navy">
        {label}
      </label>
      <div className="grid gap-2 sm:grid-cols-2">
        {(["en", "he"] as const).map((lang) =>
          multiline ? (
            <textarea
              key={lang}
              dir={lang === "he" ? "rtl" : "ltr"}
              rows={rows}
              placeholder={lang === "en" ? "English" : "עברית"}
              value={v[lang]}
              onChange={(e) => onChange({ ...v, [lang]: e.target.value })}
              className={base}
            />
          ) : (
            <input
              key={lang}
              dir={lang === "he" ? "rtl" : "ltr"}
              placeholder={lang === "en" ? "English" : "עברית"}
              value={v[lang]}
              onChange={(e) => onChange({ ...v, [lang]: e.target.value })}
              className={base}
            />
          ),
        )}
      </div>
    </div>
  );
}
