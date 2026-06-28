"use client";

import { useState } from "react";
import type { SiteSettings, SocialLink } from "@/types/content";
import { saveSettings } from "@/actions/content-actions";
import { BilingualField } from "./BilingualField";
import { SaveBar, type SaveState } from "./SaveBar";

const linesToArr = (s: string) =>
  s
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);

const socialToText = (links: SocialLink[]) =>
  links.map((l) => `${l.platform} | ${l.url}`).join("\n");

const textToSocial = (s: string): SocialLink[] =>
  linesToArr(s).map((line) => {
    const [platform, url] = line.split("|").map((x) => x.trim());
    return { platform: platform || "", url: url || "" };
  });

function Text({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-navy">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-line bg-white px-3 py-2 text-sm"
      />
    </div>
  );
}

function Area({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-navy">
        {label}
      </label>
      {hint && <p className="mb-1 text-xs text-muted">{hint}</p>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded border border-line bg-white px-3 py-2 text-sm"
      />
    </div>
  );
}

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [s, setS] = useState<SiteSettings>(initial);
  const [state, setState] = useState<SaveState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setState("saving");
    setError(null);
    const res = await saveSettings(s);
    if (res.error) {
      setState("error");
      setError(res.error);
    } else {
      setState("saved");
    }
  }

  const p = s.person_schema;

  return (
    <div className="space-y-8">
      <section className="space-y-4 rounded-xl border border-line bg-white p-6">
        <h2 className="text-lg font-bold">Identity</h2>
        <BilingualField
          label="Site name"
          value={s.site_name}
          onChange={(site_name) => setS({ ...s, site_name })}
        />
        <BilingualField
          label="Tagline"
          value={s.tagline}
          onChange={(tagline) => setS({ ...s, tagline })}
        />
        <Text
          label="Contact email"
          value={s.contact_email}
          onChange={(contact_email) => setS({ ...s, contact_email })}
        />
        <Area
          label="Social links"
          hint="One per line, as: Platform | https://url"
          value={socialToText(s.social_links)}
          onChange={(v) => setS({ ...s, social_links: textToSocial(v) })}
        />
      </section>

      <section className="space-y-4 rounded-xl border border-line bg-white p-6">
        <h2 className="text-lg font-bold">SEO defaults</h2>
        <BilingualField
          label="Default title"
          value={s.seo_defaults.title}
          onChange={(title) =>
            setS({ ...s, seo_defaults: { ...s.seo_defaults, title } })
          }
        />
        <BilingualField
          label="Default description"
          multiline
          value={s.seo_defaults.description}
          onChange={(description) =>
            setS({ ...s, seo_defaults: { ...s.seo_defaults, description } })
          }
        />
      </section>

      <section className="space-y-4 rounded-xl border border-line bg-white p-6">
        <h2 className="text-lg font-bold">Search identity (JSON-LD)</h2>
        <p className="text-xs text-muted">
          Powers how Google understands who this site is about — key for ranking
          on your name.
        </p>
        <Text
          label="Full name"
          value={p.name}
          onChange={(name) => setS({ ...s, person_schema: { ...p, name } })}
        />
        <Area
          label="Also known as"
          hint="One per line (e.g. Amit L. Kochavi, עמית כוכבי)"
          value={p.alternateName.join("\n")}
          onChange={(v) =>
            setS({ ...s, person_schema: { ...p, alternateName: linesToArr(v) } })
          }
        />
        <BilingualField
          label="Job title"
          value={p.jobTitle}
          onChange={(jobTitle) =>
            setS({ ...s, person_schema: { ...p, jobTitle } })
          }
        />
        <BilingualField
          label="Description"
          multiline
          value={p.description}
          onChange={(description) =>
            setS({ ...s, person_schema: { ...p, description } })
          }
        />
        <Area
          label="Profile links (sameAs)"
          hint="One URL per line — LinkedIn, X, Wikipedia, etc."
          value={p.sameAs.join("\n")}
          onChange={(v) =>
            setS({ ...s, person_schema: { ...p, sameAs: linesToArr(v) } })
          }
        />
        <Area
          label="Known for"
          hint="One topic per line"
          value={(p.knowsAbout ?? []).join("\n")}
          onChange={(v) =>
            setS({ ...s, person_schema: { ...p, knowsAbout: linesToArr(v) } })
          }
        />
      </section>

      <SaveBar state={state} error={error} onSave={save} />
    </div>
  );
}
