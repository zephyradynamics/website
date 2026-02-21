import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Disable static file caching in development
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
