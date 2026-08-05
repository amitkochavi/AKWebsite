"use client";

import { useRef, useState } from "react";

/**
 * Downscale a large image in the browser before upload. Keeps photos fast to
 * upload and safely under any request-size limit, and normalises EXIF
 * orientation. Non-image or already-small files are returned untouched.
 */
async function prepare(
  file: File,
): Promise<{ blob: Blob; filename: string }> {
  const isImage = file.type.startsWith("image/");
  const smallEnough = file.size <= 1_000_000;
  if (!isImage || smallEnough) return { blob: file, filename: file.name };

  try {
    const bitmap = await createImageBitmap(file, {
      imageOrientation: "from-image",
    });
    const maxDim = 1400;
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return { blob: file, filename: file.name };
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    const blob = await new Promise<Blob | null>((r) =>
      canvas.toBlob(r, "image/jpeg", 0.85),
    );
    if (!blob) return { blob: file, filename: file.name };
    const base = file.name.replace(/\.[^.]+$/, "") || "photo";
    return { blob, filename: `${base}.jpg` };
  } catch {
    // If the browser can't decode it, upload the original and let the server
    // handle it.
    return { blob: file, filename: file.name };
  }
}

function upload(
  blob: Blob,
  filename: string,
  onProgress: (pct: number) => void,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const fd = new FormData();
    fd.append("file", blob, filename);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/admin/upload");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      let res: { url?: string; error?: string } = {};
      try {
        res = JSON.parse(xhr.responseText || "{}");
      } catch {
        /* fall through to status check */
      }
      if (xhr.status >= 200 && xhr.status < 300 && res.url) resolve(res.url);
      else reject(new Error(res.error || `Upload failed (HTTP ${xhr.status}).`));
    };
    xhr.onerror = () => reject(new Error("Network error during upload."));
    xhr.ontimeout = () => reject(new Error("Upload timed out."));
    xhr.timeout = 120_000;
    xhr.send(fd);
  });
}

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
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handle(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setBusy(true);
    setProgress(0);
    try {
      const { blob, filename } = await prepare(file);
      const url = await upload(blob, filename, setProgress);
      onChange(url);
    } catch (err) {
      setError((err as Error).message || "Upload failed. Please try again.");
    } finally {
      setBusy(false);
      // Allow re-selecting the same file after an error.
      if (inputRef.current) inputRef.current.value = "";
    }
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
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handle}
          disabled={busy}
          className="text-sm disabled:opacity-50"
        />
        <input
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="or paste an image URL"
          className="flex-1 rounded border border-line bg-white px-3 py-2 text-sm"
        />
      </div>
      {busy && (
        <div className="mt-2">
          <div className="h-2 w-full overflow-hidden rounded bg-line">
            <div
              className="h-full bg-accent transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-muted">
            {progress < 100 ? `Uploading… ${progress}%` : "Finishing up…"}
          </p>
        </div>
      )}
      {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
}
