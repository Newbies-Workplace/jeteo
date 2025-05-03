require("dotenv").config();

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  distDir: ".next",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "jeteo.newbies.pl", // todo fix hardcoded variable
      },
    ],
  },
};
