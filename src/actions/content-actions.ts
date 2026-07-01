"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { CACHE_TAGS } from "@/lib/constants";
import type { MediaItem, Page, SiteSettings } from "@/types/content";

export type ActionResult = { ok?: true; error?: string };

async function requireClient() {
  if (!hasSupabaseEnv()) throw new Error("Supabase is not configured.");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");
  return supabase;
}

function now() {
  return new Date().toISOString();
}

/**
 * Clear the affected data-cache tag AND regenerate every page across all CDN
 * locations, so a dashboard edit appears identically on every device (desktop
 * and mobile) right away instead of waiting for per-page cache windows.
 */
function revalidateEverywhere(tag: string) {
  revalidateTag(tag);
  revalidatePath("/", "layout");
}

export async function saveSettings(input: SiteSettings): Promise<ActionResult> {
  try {
    const supabase = await requireClient();
    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: 1, ...input, updated_at: now() });
    if (error) return { error: error.message };
    revalidateEverywhere(CACHE_TAGS.settings);
    return { ok: true };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function savePage(input: Page): Promise<ActionResult> {
  try {
    const supabase = await requireClient();
    const { error } = await supabase
      .from("pages")
      .upsert({ ...input, updated_at: now() }, { onConflict: "key" });
    if (error) return { error: error.message };
    revalidateEverywhere(CACHE_TAGS.pages);
    return { ok: true };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function saveMedia(
  input: MediaItem,
): Promise<ActionResult & { id?: string }> {
  try {
    const supabase = await requireClient();
    const isNew = !input.id || input.id === "new";
    const row = {
      slug: input.slug,
      kind: input.kind,
      title: input.title,
      excerpt: input.excerpt,
      body: input.body,
      cover_image: input.cover_image || null,
      external_url: input.external_url || null,
      published_at: input.published_at || null,
      is_published: input.is_published,
      sort_order: input.sort_order ?? 0,
      seo: input.seo ?? {},
      updated_at: now(),
    };
    const query = isNew
      ? supabase.from("media_items").insert(row).select("id").single()
      : supabase
          .from("media_items")
          .update(row)
          .eq("id", input.id)
          .select("id")
          .single();
    const { data, error } = await query;
    if (error) return { error: error.message };
    revalidateEverywhere(CACHE_TAGS.media);
    return { ok: true, id: data?.id };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function deleteMedia(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireClient();
    const { error } = await supabase.from("media_items").delete().eq("id", id);
    if (error) return { error: error.message };
    revalidateEverywhere(CACHE_TAGS.media);
    return { ok: true };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function uploadImage(
  formData: FormData,
): Promise<{ url?: string; error?: string }> {
  try {
    const supabase = await requireClient();
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return { error: "No file provided." };
    }
    const ext = (file.name.split(".").pop() || "bin").toLowerCase();
    const rand = Math.random().toString(36).slice(2, 10);
    const path = `uploads/${Date.now()}-${rand}.${ext}`;
    const { error } = await supabase.storage
      .from("media")
      .upload(path, file, { contentType: file.type || undefined });
    if (error) return { error: error.message };
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    return { url: data.publicUrl };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function signOutAction() {
  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}
