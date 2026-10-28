import type { NextConfig } from "next";

// Static media: cached for a day, then refreshed in the background, so re-exports reach visitors quickly.
const longCache = [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  logging: false,
  devIndicators: false,
  experimental: {
    browserDebugInfoInTerminal: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // renders carry fine detail (windows, rotor arms); the default 75 visibly softens them
    qualities: [90],
  },
  async headers() {
    return ["/video/:path*", "/poster/:path*", "/kestrel/:path*", "/map/:path*"].map((source) => ({
      source,
      headers: longCache,
    }));
  },
  // Disable static file caching in development
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
