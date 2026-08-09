import { ImageResponse } from "next/og";
import bidiFactory from "bidi-js";
import { getSettings } from "@/lib/content";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/types/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const bidi = bidiFactory();

/**
 * Satori (used by next/og) renders text in logical order left to right and
 * does NOT apply the Unicode bidi algorithm, so Hebrew comes out mirrored.
 * We reorder each string into visual order ourselves before rendering.
 */
function toVisual(text: string, base: "ltr" | "rtl"): string {
  const levels = bidi.getEmbeddingLevels(text, base);
  return bidi.getReorderedString(text, levels);
}

// Austere per-locale social-share card: white background, name in navy with
// the role line beneath. Used for any page without its own image.
export default async function OpengraphImage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
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
    size,
  );
}
