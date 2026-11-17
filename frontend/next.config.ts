import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Docker/CI use the standalone server. Windows without Developer Mode cannot create the
  // symlinks it needs, so local production builds there can set NEXT_STANDALONE=0.
  output: process.env.NEXT_STANDALONE === '0' ? undefined : 'standalone',
  poweredByHeader: false,
  eslint: {
    // Next 15's built-in lint step still calls ESLint with options that ESLint 10 removed,
    // which fails the build. Linting is a separate, mandatory step: `pnpm lint`.
    ignoreDuringBuilds: true,
  },
  async redirects() {
    // Routes retired by the Nehemiah content update. Temporary (307) redirects: the
    // team and success-story pages held unverified content and may return once approved.
    // The locale prefix is added afterwards by src/middleware.ts.
    return [
      { source: '/team', destination: '/about', permanent: false },
      { source: '/team/:slug', destination: '/about', permanent: false },
      { source: '/success-stories', destination: '/#impact', permanent: false },
      { source: '/success-stories/:slug', destination: '/#impact', permanent: false },
      { source: '/gallery/masonry', destination: '/gallery', permanent: false },
    ];
  },
};

export default nextConfig;
