import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // App Hosting's adapter can skip public/ when a traced file already created
  // that directory. Include every public asset so logos and backgrounds ship
  // alongside the artwork read by the social-image routes.
  outputFileTracingIncludes: {
    "/*": ["./public/**/*"],
  },
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
