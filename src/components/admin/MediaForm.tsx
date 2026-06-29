"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { MediaItem, MediaKind } from "@/types/content";
import { deleteMedia, saveMedia } from "@/actions/content-actions";
import { BilingualField } from "./BilingualField";
import { BilingualRichText } from "./RichText";
import { ImageUploader } from "./ImageUploader";
import { SaveBar, type SaveState } from "./SaveBar";

const KINDS: MediaKind[] = ["article", "press", "video", "reading", "writing"];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export function MediaForm({ initial }: { initial: MediaItem }) {
  const router = useRouter();
  const [m, setM] = useState<MediaItem>(initial);
  const [state, setState] = useState<SaveState>("idle");
  const [error, setError] = useState<string | null>(null);
  const isNew = !m.id || m.id === "new";

  async function save() {
    setState("saving");
    setError(null);
    const slug = m.slug || slugify(m.title.en || m.title.he);
    const res = await saveMedia({ ...m, slug });
    if (res.error) {
      setState("error");
      setError(res.error);
      return;
    }
    setState("saved");
    if (isNew && res.id) {
      router.replace(`/admin/media/${res.id}`);
      router.refresh();
    }
  }

  async function remove() {
    if (isNew) return;
    if (!confirm("Delete this item? This cannot be undone.")) return;
    const res = await deleteMedia(m.id);
    if (res.error) {
      setState("error");
      setError(res.error);
      return;
    }
    router.push("/admin/media");
    router.refresh();
  }

  const fieldClass =
    "w-full rounded border border-line bg-white px-3 py-2 text-sm";

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">
        {isNew ? "New item" : "Edit item"}
      </h1>

      <section className="space-y-4 rounded-xl border border-line bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">
              Type
            </label>
            <select
              value={m.kind}
              onChange={(e) =>
                setM({ ...m, kind: e.target.value as MediaKind })
              }
              className={fieldClass}
            >
              {KINDS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-ink">
              Slug (URL)
            </label>
            <input
              value={m.slug}
              onChange={(e) => setM({ ...m, slug: e.target.value })}
              placeholder="auto-generated from the English title"
              className={fieldClass}
            />
          </div>
        </div>

        <BilingualField
          label="Title"
          value={m.title}
          onChange={(title) => setM({ ...m, title })}
        />
        <BilingualField
          label="Excerpt"
          multiline
          value={m.excerpt}
          onChange={(excerpt) => setM({ ...m, excerpt })}
        />
        <BilingualRichText
          label="Body"
          value={m.body}
          onChange={(body) => setM({ ...m, body })}
        />
      </section>

      <section className="space-y-4 rounded-xl border border-line bg-white p-6">
        <ImageUploader
          label="Cover image"
          value={m.cover_image}
          onChange={(cover_image) => setM({ ...m, cover_image })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">
              External link (optional)
            </label>
            <input
              value={m.external_url ?? ""}
              onChange={(e) => setM({ ...m, external_url: e.target.value })}
              placeholder="https://…"
              className={fieldClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">
              Published date
            </label>
            <input
              type="date"
              value={m.published_at ?? ""}
              onChange={(e) =>
                setM({ ...m, published_at: e.target.value || null })
              }
              className={fieldClass}
            />
          </div>
        </div>
      </section>

      <SaveBar
        state={state}
        error={error}
        onSave={save}
        extra={
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={m.is_published}
                onChange={(e) =>
                  setM({ ...m, is_published: e.target.checked })
                }
              />
              Published
            </label>
            {!isNew && (
              <button
                type="button"
                onClick={remove}
                className="text-sm font-medium text-red-700 hover:underline"
              >
                Delete
              </button>
            )}
          </div>
        }
      />
    </div>
  );
}
