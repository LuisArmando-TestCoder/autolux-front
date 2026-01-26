import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'imgix.cosmicjs.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.cosmicjs.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  }
};

export default nextConfig;
