/* eslint-disable no-undef */

import "./env.mjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@saas/ui"],
  experimental: {
    optimizePackageImports: ["@saas/ui", "react-icons"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
};
export default nextConfig;
