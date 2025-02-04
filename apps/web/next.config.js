require("dotenv").config();
const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  distDir: ".next",
  compiler: {
    reactRemoveProperties: {
      properties: isDev ? [] : ["^data-cy"],
    },
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
