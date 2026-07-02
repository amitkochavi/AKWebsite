import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    // Old paths from the previous site (still in Google's index) that map to a
    // specific new page. Case normalization is handled in middleware.
    return [
      { source: "/resume", destination: "/en/about", permanent: true },
    ];
  },
  async headers() {
    // Belt-and-suspenders: tell every crawler not to index the dashboard or
    // API, at the HTTP level (stronger than the meta tag, covers non-HTML too).
    return [
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
