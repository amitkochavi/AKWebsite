import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser Supabase client. Used by client components (e.g. the admin login
 * form). Reads are governed by RLS; the anon key is safe to expose.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
