import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Avoid dev-time optimizer crashes / stale chunk errors on local PNG assets
    unoptimized: process.env.NODE_ENV === "development",
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/for/uk",
        destination: "/for/uk-investors",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
