import { ImageResponse } from "next/og";
import { getSettings } from "@/lib/content";
import { pick } from "@/lib/i18n";
import type { Locale } from "@/types/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded default social-share card, used for any page without its own image.
export default async function OpengraphImage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const settings = await getSettings();
  const l = locale as Locale;
  const name = pick(settings.site_name, l);
  const tagline = pick(settings.tagline, l);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f2742 0%, #1c3a5e 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, color: "#ffffff" }}>
          {name}
        </div>
        <div style={{ fontSize: 40, marginTop: 24, color: "#b58a4b" }}>
          {tagline}
        </div>
      </div>
    ),
    size,
  );
}
