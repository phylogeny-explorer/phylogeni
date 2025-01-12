import type { NextConfig } from 'next/types';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  reactStrictMode: true,
  eslint: {
    dirs: ['src'],
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'upload.wikimedia.org'],
  },
};

export default nextConfig;
