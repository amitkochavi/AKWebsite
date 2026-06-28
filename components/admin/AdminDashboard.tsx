'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SiteContent, Section, Pillar, NewsPost } from '@/lib/types';
import { TextField, Card } from './fields';

type Locale = 'en' | 'he';
type Tab = 'content' | 'messages';

interface Message {
  name: string;
  email: string;
  message: string;
  at: string;
}

export function AdminDashboard() {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>('en');
  const [tab, setTab] = useState<Tab>('content');
  const [content, setContent] = useState<SiteContent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string>('');

  const dir = locale === 'he' ? 'rtl' : 'ltr';

  const load = useCallback(async (loc: Locale) => {
    setLoading(true);
    const res = await fetch(`/api/admin/content?locale=${loc}`);
    if (res.status === 401) {
      window.location.href = '/admin/login';
      return;
    }
    const data = await res.json();
    setContent(data.content);
    setLoading(false);
  }, []);

  useEffect(() => {
    load(locale);
  }, [locale, load]);

  useEffect(() => {
    if (tab === 'messages') {
      fetch('/api/admin/messages')
        .then((r) => r.json())
        .then((d) => setMessages(d.messages || []));
    }
  }, [tab]);

  function update(mutator: (draft: SiteContent) => void) {
    setContent((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      mutator(next);
      return next;
    });
  }

  async function save() {
    if (!content) return;
    setSaving(true);
    const res = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locale, content }),
    });
    setSaving(false);
    if (res.ok) setSavedAt(new Date().toLocaleTimeString());
  }

  async function reset() {
    if (!confirm('Reset this language back to the original shipped content?')) return;
    const res = await fetch(`/api/admin/content?locale=${locale}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.ok) {
      setContent(data.content);
      setSavedAt('reset');
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-xs font-bold text-white">
              AK
            </span>
            <span className="text-sm font-semibold">Content Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/en" target="_blank" className="text-sm text-brand hover:underline">
              View site ↗
            </a>
            <button onClick={logout} className="text-sm text-ink-soft hover:text-ink">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-8">
        {/* Tabs */}
        <div className="mb-6 flex items-center gap-2">
          {(['content', 'messages'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md px-4 py-2 text-sm font-medium capitalize ${
                tab === t ? 'bg-ink text-white' : 'bg-white text-ink-soft hover:bg-ink/5'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'content' && (
          <>
            {/* Locale switch + actions */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex rounded-md border border-ink/15 bg-white p-1">
                {(['en', 'he'] as Locale[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`rounded px-4 py-1.5 text-sm font-medium ${
                      locale === l ? 'bg-brand text-white' : 'text-ink-soft'
                    }`}
                  >
                    {l === 'en' ? 'English' : 'עברית'}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                {savedAt && (
                  <span className="text-xs text-green-600">
                    {savedAt === 'reset' ? 'Reset to defaults' : `Saved ${savedAt}`}
                  </span>
                )}
                <button onClick={reset} className="text-sm text-ink-soft hover:text-ink">
                  Reset
                </button>
                <button onClick={save} className="btn-primary px-5 py-2 text-sm" disabled={saving}>
                  {saving ? 'Saving…' : 'Save changes'}
                </button>
              </div>
            </div>

            {loading || !content ? (
              <p className="text-ink-soft">Loading…</p>
            ) : (
              <div className="space-y-6" dir={dir}>
                <Card title="Site & SEO">
                  <TextField label="Name" value={content.site.name} dir={dir} onChange={(v) => update((d) => { d.site.name = v; })} />
                  <TextField label="Tagline" value={content.site.tagline} dir={dir} onChange={(v) => update((d) => { d.site.tagline = v; })} />
                  <TextField label="Meta description" textarea value={content.site.description} dir={dir} onChange={(v) => update((d) => { d.site.description = v; })} />
                  <TextField label="Email" value={content.site.email} dir="ltr" onChange={(v) => update((d) => { d.site.email = v; })} />
                  <TextField label="Location" value={content.site.location} dir={dir} onChange={(v) => update((d) => { d.site.location = v; })} />
                </Card>

                <Card title="Hero">
                  <TextField label="Eyebrow" value={content.hero.eyebrow} dir={dir} onChange={(v) => update((d) => { d.hero.eyebrow = v; })} />
                  <TextField label="Title" textarea value={content.hero.title} dir={dir} onChange={(v) => update((d) => { d.hero.title = v; })} />
                  <TextField label="Subtitle" textarea value={content.hero.subtitle} dir={dir} onChange={(v) => update((d) => { d.hero.subtitle = v; })} />
                  <TextField label="Primary button" value={content.hero.primaryCta} dir={dir} onChange={(v) => update((d) => { d.hero.primaryCta = v; })} />
                  <TextField label="Secondary button" value={content.hero.secondaryCta} dir={dir} onChange={(v) => update((d) => { d.hero.secondaryCta = v; })} />
                </Card>

                <Card title="Intro">
                  <TextField label="Title" value={content.intro.title} dir={dir} onChange={(v) => update((d) => { d.intro.title = v; })} />
                  <TextField label="Body" textarea rows={4} value={content.intro.body} dir={dir} onChange={(v) => update((d) => { d.intro.body = v; })} />
                </Card>

                <Card title="Pillars (home cards)">
                  {content.pillars.map((pillar: Pillar, i) => (
                    <div key={i} className="rounded-lg border border-ink/10 p-4">
                      <TextField label={`Card ${i + 1} title`} value={pillar.title} dir={dir} onChange={(v) => update((d) => { d.pillars[i].title = v; })} />
                      <div className="mt-3">
                        <TextField label="Summary" textarea value={pillar.summary} dir={dir} onChange={(v) => update((d) => { d.pillars[i].summary = v; })} />
                      </div>
                      <div className="mt-3">
                        <TextField label="Link label" value={pillar.cta} dir={dir} onChange={(v) => update((d) => { d.pillars[i].cta = v; })} />
                      </div>
                    </div>
                  ))}
                </Card>

                <SectionedPageEditor
                  title="Business page"
                  dir={dir}
                  lead={content.business.lead}
                  intro={content.business.intro}
                  sections={content.business.sections}
                  onLead={(v) => update((d) => { d.business.lead = v; })}
                  onIntro={(v) => update((d) => { d.business.intro = v; })}
                  onSection={(i, field, v) => update((d) => { d.business.sections[i][field] = v; })}
                  onAddSection={() => update((d) => { d.business.sections.push({ heading: '', body: '' }); })}
                  onRemoveSection={(i) => update((d) => { d.business.sections.splice(i, 1); })}
                  extra={
                    <>
                      <TextField label="Philosophy title" value={content.business.philosophyTitle} dir={dir} onChange={(v) => update((d) => { d.business.philosophyTitle = v; })} />
                      <TextField label="Philosophy statement" textarea value={content.business.philosophy} dir={dir} onChange={(v) => update((d) => { d.business.philosophy = v; })} />
                    </>
                  }
                />

                <SectionedPageEditor
                  title="Philanthropy page"
                  dir={dir}
                  lead={content.philanthropy.lead}
                  intro={content.philanthropy.intro}
                  sections={content.philanthropy.sections}
                  onLead={(v) => update((d) => { d.philanthropy.lead = v; })}
                  onIntro={(v) => update((d) => { d.philanthropy.intro = v; })}
                  onSection={(i, field, v) => update((d) => { d.philanthropy.sections[i][field] = v; })}
                  onAddSection={() => update((d) => { d.philanthropy.sections.push({ heading: '', body: '' }); })}
                  onRemoveSection={(i) => update((d) => { d.philanthropy.sections.splice(i, 1); })}
                />

                <SectionedPageEditor
                  title="Public Service page"
                  dir={dir}
                  lead={content.publicService.lead}
                  intro={content.publicService.intro}
                  sections={content.publicService.sections}
                  onLead={(v) => update((d) => { d.publicService.lead = v; })}
                  onIntro={(v) => update((d) => { d.publicService.intro = v; })}
                  onSection={(i, field, v) => update((d) => { d.publicService.sections[i][field] = v; })}
                  onAddSection={() => update((d) => { d.publicService.sections.push({ heading: '', body: '' }); })}
                  onRemoveSection={(i) => update((d) => { d.publicService.sections.splice(i, 1); })}
                />

                <Card title="News posts">
                  {content.news.posts.map((post: NewsPost, i) => (
                    <div key={i} className="rounded-lg border border-ink/10 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-ink-soft">Post {i + 1}</span>
                        <button onClick={() => update((d) => { d.news.posts.splice(i, 1); })} className="text-xs text-red-600 hover:underline">
                          Remove
                        </button>
                      </div>
                      <div className="mt-3 space-y-3">
                        <TextField label="Title" value={post.title} dir={dir} onChange={(v) => update((d) => { d.news.posts[i].title = v; })} />
                        <div className="grid grid-cols-2 gap-3">
                          <TextField label="Slug (url)" value={post.slug} dir="ltr" onChange={(v) => update((d) => { d.news.posts[i].slug = v; })} />
                          <TextField label="Date (YYYY-MM-DD)" value={post.date} dir="ltr" onChange={(v) => update((d) => { d.news.posts[i].date = v; })} />
                        </div>
                        <TextField label="Excerpt" textarea value={post.excerpt} dir={dir} onChange={(v) => update((d) => { d.news.posts[i].excerpt = v; })} />
                        <TextField label="Body" textarea rows={5} value={post.body} dir={dir} onChange={(v) => update((d) => { d.news.posts[i].body = v; })} />
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => update((d) => { d.news.posts.unshift({ slug: 'new-post', title: 'New post', date: '2026-01-01', excerpt: '', body: '' }); })}
                    className="btn-outline px-4 py-2 text-sm"
                  >
                    + Add post
                  </button>
                </Card>

                <Card title="Contact">
                  <TextField label="Intro" textarea value={content.contact.intro} dir={dir} onChange={(v) => update((d) => { d.contact.intro = v; })} />
                </Card>
              </div>
            )}
          </>
        )}

        {tab === 'messages' && (
          <Card title="Contact submissions">
            {messages.length === 0 ? (
              <p className="text-sm text-ink-soft">No messages yet.</p>
            ) : (
              <ul className="space-y-4">
                {messages
                  .slice()
                  .reverse()
                  .map((m, i) => (
                    <li key={i} className="rounded-lg border border-ink/10 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{m.name}</span>
                        <span className="text-xs text-ink-soft">{new Date(m.at).toLocaleString()}</span>
                      </div>
                      <a href={`mailto:${m.email}`} className="text-sm text-brand hover:underline">
                        {m.email}
                      </a>
                      <p className="mt-2 whitespace-pre-wrap text-sm text-ink-soft">{m.message}</p>
                    </li>
                  ))}
              </ul>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}

function SectionedPageEditor({
  title,
  dir,
  lead,
  intro,
  sections,
  onLead,
  onIntro,
  onSection,
  onAddSection,
  onRemoveSection,
  extra,
}: {
  title: string;
  dir: 'ltr' | 'rtl';
  lead: string;
  intro: string;
  sections: Section[];
  onLead: (v: string) => void;
  onIntro: (v: string) => void;
  onSection: (i: number, field: keyof Section, v: string) => void;
  onAddSection: () => void;
  onRemoveSection: (i: number) => void;
  extra?: React.ReactNode;
}) {
  return (
    <Card title={title}>
      <TextField label="Lead" value={lead} dir={dir} onChange={onLead} />
      <TextField label="Intro" textarea rows={4} value={intro} dir={dir} onChange={onIntro} />
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Sections</span>
        {sections.map((s, i) => (
          <div key={i} className="rounded-lg border border-ink/10 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-ink-soft">Section {i + 1}</span>
              <button onClick={() => onRemoveSection(i)} className="text-xs text-red-600 hover:underline">
                Remove
              </button>
            </div>
            <div className="mt-3 space-y-3">
              <TextField label="Heading" value={s.heading} dir={dir} onChange={(v) => onSection(i, 'heading', v)} />
              <TextField label="Body" textarea value={s.body} dir={dir} onChange={(v) => onSection(i, 'body', v)} />
            </div>
          </div>
        ))}
        <button onClick={onAddSection} className="btn-outline px-4 py-2 text-sm">
          + Add section
        </button>
      </div>
      {extra}
    </Card>
  );
}
