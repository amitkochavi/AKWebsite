'use client';

import { useState } from 'react';
import type { SiteContent } from '@/lib/types';

export function ContactForm({ content }: { content: SiteContent }) {
  const c = content.contact;
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const inputClass =
    'w-full rounded-md border border-ink/20 bg-white px-4 py-3 text-ink outline-none focus:border-brand focus:ring-1 focus:ring-brand';

  if (status === 'sent') {
    return (
      <div className="rounded-xl border border-brand/30 bg-brand/5 p-8">
        <p className="text-lg font-semibold text-brand">
          {content.site.name === 'עמית כוכבי' ? 'תודה! ההודעה נשלחה.' : 'Thank you — your message was sent.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flow">
      <div>
        <label className="mb-1.5 block text-sm font-medium" htmlFor="name">
          {c.formName}
        </label>
        <input id="name" name="name" required className={inputClass} autoComplete="name" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium" htmlFor="email">
          {c.formEmail}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClass}
          autoComplete="email"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium" htmlFor="message">
          {c.formMessage}
        </label>
        <textarea id="message" name="message" required rows={5} className={inputClass} />
      </div>
      <button type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? '…' : c.formSubmit}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-600">
          {content.site.name === 'עמית כוכבי'
            ? 'אירעה שגיאה. נסו שוב או שלחו דוא"ל.'
            : 'Something went wrong. Please try again or email directly.'}
        </p>
      )}
    </form>
  );
}
