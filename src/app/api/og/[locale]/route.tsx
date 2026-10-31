import { ImageResponse } from "next/og";
import bidiFactory from "bidi-js";
import { getSettings } from "@/lib/content";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/types/content";

const bidi = bidiFactory();

// Satori (next/og) renders text in logical order and does not apply the Unicode
// bidi algorithm, so Hebrew would come out mirrored. Reorder to visual order.
function toVisual(text: string, base: "ltr" | "rtl"): string {
  const levels = bidi.getEmbeddingLevels(text, base);
  return bidi.getReorderedString(text, levels);
}

// Per-locale social-share card at a stable URL (/api/og/he, /api/og/en) so it
// can be referenced as og:image on every page. White background, navy name,
// accent rule, role line beneath.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  const settings = await getSettings();
  const l = locale as Locale;
  const rtl = l === "he";
  const base = rtl ? "rtl" : "ltr";
  const name = toVisual(pick(settings.site_name, l), base);
  const tagline = toVisual(pick(settings.tagline, l), base);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: rtl ? "flex-end" : "flex-start",
          textAlign: rtl ? "right" : "left",
          padding: "96px",
          background: "#ffffff",
          color: "#0f172a",
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 600, color: "#1e3a8a" }}>
          {name}
        </div>
        <div
          style={{
            width: 96,
            height: 4,
            marginTop: 28,
            marginBottom: 28,
            background: "#1e3a8a",
          }}
        />
        <div style={{ fontSize: 34, fontWeight: 400, color: "#475569" }}>
          {tagline}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
