import Link from 'next/link';
import type { Section } from '@/lib/types';

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="border-b border-ink/10 bg-gradient-to-b from-white to-paper">
      <div className="container-content py-16 sm:py-20">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl prose-body">{lead}</p>
      </div>
    </section>
  );
}

export function IntroBlock({ children }: { children: React.ReactNode }) {
  return (
    <section className="container-content py-14">
      <p className="max-w-3xl prose-body">{children}</p>
    </section>
  );
}

export function SectionGrid({ sections }: { sections: Section[] }) {
  return (
    <section className="container-content pb-16">
      <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => (
          <div key={s.heading} className="bg-white p-8">
            <h2 className="text-xl font-semibold">{s.heading}</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CalloutBlock({ title, body }: { title: string; body: string }) {
  return (
    <section className="container-content pb-20">
      <div className="rounded-2xl bg-ink p-10 text-white sm:p-14">
        <p className="eyebrow text-gold">{title}</p>
        <p className="mt-4 max-w-3xl text-2xl font-medium leading-snug sm:text-3xl">{body}</p>
      </div>
    </section>
  );
}

export function BackToContact({ href, label }: { href: string; label: string }) {
  return (
    <section className="container-content pb-20">
      <Link href={href} className="btn-primary">
        {label}
      </Link>
    </section>
  );
}
