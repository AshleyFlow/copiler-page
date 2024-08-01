/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === "development" ? "" : "/copiler-page",
  images: { unoptimized: true },
  output: "export",
};

export default nextConfig;
