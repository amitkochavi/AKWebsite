"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const data = new FormData(e.currentTarget);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: String(data.get("email")),
        password: String(data.get("password")),
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Sign-in failed. Please try again.");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded border border-line bg-white px-3 py-2.5 text-base text-ink focus:border-brand";

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <div className="rounded-xl border border-line bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Sign in to manage content.</p>

        {!configured && (
          <p className="mt-4 rounded bg-amber-50 p-3 text-sm text-amber-800">
            Supabase is not configured yet. Set{" "}
            <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to enable login.
          </p>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className={inputClass}
            />
          </div>
          {error && <p className="text-sm font-medium text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={loading || !configured}
            className="w-full rounded bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-soft disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
