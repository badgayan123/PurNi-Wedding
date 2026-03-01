/** @type {import('next').NextConfig} */
const isGHPages = process.env.GITHUB_PAGES === "true";
const nextConfig = {
  ...(isGHPages && { output: "export" }),
  ...(isGHPages && { basePath: "/PurNi-Wedding" }),
  ...(isGHPages && { assetPrefix: "/PurNi-Wedding/" }),
  images: {
    unoptimized: isGHPages,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
  },
};

export default nextConfig;
