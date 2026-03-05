import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eo-img.521799.xyz",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
