import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  typedRoutes: false,
};

export default nextConfig;
