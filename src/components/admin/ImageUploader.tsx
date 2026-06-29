"use client";

import { useState } from "react";
import { uploadImage } from "@/actions/content-actions";

export function ImageUploader({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handle(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadImage(fd);
    setBusy(false);
    if (res.error) setError(res.error);
    else if (res.url) onChange(res.url);
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-ink">
        {label}
      </label>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="mb-2 h-32 w-full rounded border border-line object-cover"
        />
      )}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handle}
          className="text-sm"
        />
        <input
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="or paste an image URL"
          className="flex-1 rounded border border-line bg-white px-3 py-2 text-sm"
        />
      </div>
      {busy && <p className="mt-1 text-xs text-muted">Uploading…</p>}
      {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
}
