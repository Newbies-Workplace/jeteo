/** @type {import('next').NextConfig} */
require("dotenv").config();
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  reactStrictMode: false,
  compiler: {
    reactRemoveProperties: {
      properties: isDev ? [] : ["^data-cy"],
    },
  },
  experimental: {
    esmExternals: "loose",
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
