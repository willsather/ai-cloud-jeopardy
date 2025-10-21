import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://sitecore-jeopardy.vercel.app",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
