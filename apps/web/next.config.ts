import type { NextConfig } from "next";

require("dotenv").config();

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  compiler: {
    reactRemoveProperties: {
      properties: isDev ? [] : ["^data-cy"],
    },
  },
  experimental: {
    esmExternals: "loose",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["jeteo.newbies.pl"], //todo fix hardcoded variable
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
  },
};

export default nextConfig;
