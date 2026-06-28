'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.replace('/admin');
      router.refresh();
    } else {
      setError('Invalid password');
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-paper px-4">
      <div className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm font-bold text-white">
            AK
          </span>
          <span className="font-semibold">Content Dashboard</span>
        </div>
        <h1 className="mt-6 text-xl font-bold">Sign in</h1>
        <p className="mt-1 text-sm text-ink-soft">Enter the admin password to manage content.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full rounded-md border border-ink/20 px-4 py-3 outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? '…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
