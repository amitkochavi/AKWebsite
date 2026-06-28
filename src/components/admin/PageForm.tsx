"use client";

import { useState } from "react";
import Link from "next/link";
import type { Hero, Page } from "@/types/content";
import { savePage } from "@/actions/content-actions";
import { BilingualField } from "./BilingualField";
import { BlockEditor } from "./BlockEditor";
import { ImageUploader } from "./ImageUploader";
import { SaveBar, type SaveState } from "./SaveBar";

export function PageForm({ initial }: { initial: Page }) {
  const [page, setPage] = useState<Page>(initial);
  const [state, setState] = useState<SaveState>("idle");
  const [error, setError] = useState<string | null>(null);

  const setHero = (patch: Partial<Hero>) =>
    setPage({ ...page, hero: { ...page.hero, ...patch } });

  async function save() {
    setState("saving");
    setError(null);
    const res = await savePage(page);
    if (res.error) {
      setState("error");
      setError(res.error);
    } else {
      setState("saved");
    }
  }

  const viewPath = page.key === "home" ? "/en" : `/en/${page.key}`;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold capitalize">
          {page.key.replace("-", " ")}
        </h1>
        <Link
          href={viewPath}
          target="_blank"
          className="text-sm font-medium text-gold-dark hover:underline"
        >
          View page ↗
        </Link>
      </div>

      <section className="space-y-4 rounded-xl border border-line bg-white p-6">
        <h2 className="text-lg font-bold">Hero</h2>
        <BilingualField
          label="Title"
          value={page.hero.title}
          onChange={(title) => setHero({ title })}
        />
        <BilingualField
          label="Subtitle"
          multiline
          value={page.hero.subtitle}
          onChange={(subtitle) => setHero({ subtitle })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <BilingualField
            label="Button label (optional)"
            value={page.hero.cta_label}
            onChange={(cta_label) => setHero({ cta_label })}
          />
          <div>
            <label className="mb-1 block text-sm font-semibold text-navy">
              Button link (optional)
            </label>
            <input
              value={page.hero.cta_href ?? ""}
              onChange={(e) => setHero({ cta_href: e.target.value })}
              placeholder="/about"
              className="w-full rounded border border-line bg-white px-3 py-2 text-sm"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold">Content blocks</h2>
        <BlockEditor
          blocks={page.blocks}
          onChange={(blocks) => setPage({ ...page, blocks })}
        />
      </section>

      <section className="space-y-4 rounded-xl border border-line bg-white p-6">
        <h2 className="text-lg font-bold">SEO (optional overrides)</h2>
        <BilingualField
          label="Meta title"
          value={page.seo?.title}
          onChange={(title) => setPage({ ...page, seo: { ...page.seo, title } })}
        />
        <BilingualField
          label="Meta description"
          multiline
          value={page.seo?.description}
          onChange={(description) =>
            setPage({ ...page, seo: { ...page.seo, description } })
          }
        />
      </section>

      <SaveBar
        state={state}
        error={error}
        onSave={save}
        extra={
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={page.is_published}
              onChange={(e) =>
                setPage({ ...page, is_published: e.target.checked })
              }
            />
            Published
          </label>
        }
      />
    </div>
  );
}
