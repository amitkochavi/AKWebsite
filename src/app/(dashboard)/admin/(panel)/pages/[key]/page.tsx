import { notFound } from "next/navigation";
import { loadPage } from "@/lib/admin-data";
import { PageForm } from "@/components/admin/PageForm";
import type { PageKey } from "@/types/content";

export const dynamic = "force-dynamic";

const KEYS: PageKey[] = [
  "home",
  "about",
  "business",
  "philanthropy",
  "public-service",
  "contact",
];

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  if (!KEYS.includes(key as PageKey)) notFound();
  const page = await loadPage(key as PageKey);
  return <PageForm initial={page} />;
}
