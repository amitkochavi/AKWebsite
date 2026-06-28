import { notFound } from "next/navigation";
import { loadMedia } from "@/lib/admin-data";
import { MediaForm } from "@/components/admin/MediaForm";
import type { MediaItem } from "@/types/content";

export const dynamic = "force-dynamic";

const EMPTY: MediaItem = {
  id: "new",
  slug: "",
  kind: "article",
  title: { en: "", he: "" },
  excerpt: { en: "", he: "" },
  body: { en: "", he: "" },
  cover_image: "",
  external_url: "",
  published_at: null,
  is_published: true,
  sort_order: 0,
  seo: {},
};

export default async function EditMediaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (id === "new") return <MediaForm initial={EMPTY} />;
  const item = await loadMedia(id);
  if (!item) notFound();
  return <MediaForm initial={item} />;
}
