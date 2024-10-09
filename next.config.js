const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  // add your own icons to src/app/manifest.ts
  // to re-generate manifest.json, you can visit https://tomitm.github.io/appmanifest/
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  swcMinify: true,
  reactStrictMode: true,
  eslint: {
    dirs: ['src'],
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'upload.wikimedia.org'],
  },
  headers: [
    {
      key: 'Access-Control-Allow-Origin',
      value: process.env.NEXT_PUBLIC_APP_URL,
    },
  ],
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
});
