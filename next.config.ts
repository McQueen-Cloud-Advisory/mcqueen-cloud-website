import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/opengraph-image",
        destination: "/opengraph-image/brand-v2",
        permanent: false,
      },
      {
        source: "/twitter-image",
        destination: "/twitter-image/brand-v2",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
