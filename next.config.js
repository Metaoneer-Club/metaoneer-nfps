/** @type {import('next').NextConfig} */
const nextConfig = {
  baseUrl: "src",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "",
  },
};

module.exports = nextConfig;
