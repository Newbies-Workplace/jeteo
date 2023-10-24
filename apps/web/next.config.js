/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  experimental: {
    esmExternals: "loose",
  },
  images: {
    domains: ["jeteo.newbies.pl"], //todo fox hardcoded variable
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
  },
};
