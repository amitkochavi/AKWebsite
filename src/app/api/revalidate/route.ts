import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/constants";

/**
 * Optional external revalidation hook. Dashboard server actions already call
 * revalidateTag directly; this endpoint lets you also trigger it manually:
 *   POST /api/revalidate?secret=...&tag=pages
 */
export async function POST(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const tag = url.searchParams.get("tag");
  const tags = tag ? [tag] : Object.values(CACHE_TAGS);
  tags.forEach((t) => revalidateTag(t));
  return NextResponse.json({ revalidated: tags });
}
