import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    loader: "custom",
    path: "/",
  },
  trailingSlash: true,
};

export default nextConfig;
