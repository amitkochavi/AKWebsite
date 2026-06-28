import { unstable_cache } from "next/cache";
import { createServerClient } from "@supabase/ssr";
import { CACHE_TAGS } from "./constants";
import {
  FALLBACK_MEDIA,
  FALLBACK_PAGES,
  FALLBACK_SETTINGS,
} from "./fallback-content";
import type {
  MediaItem,
  Page,
  PageKey,
  SiteSettings,
} from "@/types/content";

function hasEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/**
 * Cookie-less anon client for public, cacheable reads. RLS allows public
 * SELECT on published content, so no session is needed. Kept cookie-less so it
 * is safe to call inside `unstable_cache`.
 */
function readClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } },
  );
}

export const getSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    if (!hasEnv()) return FALLBACK_SETTINGS;
    try {
      const supabase = readClient();
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .eq("id", 1)
        .single();
      if (error || !data) return FALLBACK_SETTINGS;
      const { id: _id, updated_at: _u, ...rest } = data;
      return { ...FALLBACK_SETTINGS, ...rest } as SiteSettings;
    } catch {
      return FALLBACK_SETTINGS;
    }
  },
  ["settings"],
  { tags: [CACHE_TAGS.settings], revalidate: 60 },
);

export const getAllPages = unstable_cache(
  async (): Promise<Page[]> => {
    const fallback = Object.values(FALLBACK_PAGES);
    if (!hasEnv()) return fallback;
    try {
      const supabase = readClient();
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (error || !data || data.length === 0) return fallback;
      return data as Page[];
    } catch {
      return fallback;
    }
  },
  ["pages"],
  { tags: [CACHE_TAGS.pages], revalidate: 60 },
);

export const getPage = unstable_cache(
  async (key: PageKey): Promise<Page | null> => {
    const fallback = FALLBACK_PAGES[key] ?? null;
    if (!hasEnv()) return fallback;
    try {
      const supabase = readClient();
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("key", key)
        .eq("is_published", true)
        .single();
      if (error || !data) return fallback;
      return data as Page;
    } catch {
      return fallback;
    }
  },
  ["page"],
  { tags: [CACHE_TAGS.pages], revalidate: 60 },
);

export const getMediaItems = unstable_cache(
  async (): Promise<MediaItem[]> => {
    if (!hasEnv()) return FALLBACK_MEDIA;
    try {
      const supabase = readClient();
      const { data, error } = await supabase
        .from("media_items")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      if (error || !data || data.length === 0) return FALLBACK_MEDIA;
      return data as MediaItem[];
    } catch {
      return FALLBACK_MEDIA;
    }
  },
  ["media"],
  { tags: [CACHE_TAGS.media], revalidate: 60 },
);

export const getMediaItem = unstable_cache(
  async (slug: string): Promise<MediaItem | null> => {
    const fallback = FALLBACK_MEDIA.find((m) => m.slug === slug) ?? null;
    if (!hasEnv()) return fallback;
    try {
      const supabase = readClient();
      const { data, error } = await supabase
        .from("media_items")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();
      if (error || !data) return fallback;
      return data as MediaItem;
    } catch {
      return fallback;
    }
  },
  ["media-item"],
  { tags: [CACHE_TAGS.media], revalidate: 60 },
);
