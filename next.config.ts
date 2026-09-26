import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  logging: false,
  devIndicators: false,
  experimental: {
    browserDebugInfoInTerminal: false,
  },
  // Disable static file caching in development
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
