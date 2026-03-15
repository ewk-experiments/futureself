import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/futureself',
  images: { unoptimized: true },
};

export default nextConfig;
