/** @type {import('next').NextConfig} */
const nextConfig = {
  baseUrl: "src",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "/",
    unoptimized: true,
  },
};

module.exports = nextConfig;
