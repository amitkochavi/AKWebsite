import { createClient } from "@/lib/supabase/server";
import {
  FALLBACK_MEDIA,
  FALLBACK_PAGES,
  FALLBACK_SETTINGS,
} from "./fallback-content";
import type { MediaItem, Page, PageKey, SiteSettings } from "@/types/content";

/**
 * Admin-side reads using the cookie-bound (authenticated) client. Unlike the
 * public fetchers these are uncached and return unpublished rows too, so the
 * dashboard always shows the latest editable state.
 */

export async function loadSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single();
    if (!data) return FALLBACK_SETTINGS;
    const { id: _id, updated_at: _u, ...rest } = data;
    return { ...FALLBACK_SETTINGS, ...rest } as SiteSettings;
  } catch {
    return FALLBACK_SETTINGS;
  }
}

export async function loadPage(key: PageKey): Promise<Page> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("pages")
      .select("*")
      .eq("key", key)
      .single();
    return (data as Page) ?? FALLBACK_PAGES[key];
  } catch {
    return FALLBACK_PAGES[key];
  }
}

export async function loadAllMedia(): Promise<MediaItem[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("media_items")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!data || data.length === 0) return FALLBACK_MEDIA;
    return data as MediaItem[];
  } catch {
    return FALLBACK_MEDIA;
  }
}

export async function loadMedia(id: string): Promise<MediaItem | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("media_items")
      .select("*")
      .eq("id", id)
      .single();
    return (data as MediaItem) ?? null;
  } catch {
    return null;
  }
}
