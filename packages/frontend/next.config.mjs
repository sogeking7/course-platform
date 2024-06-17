/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.shoqan-edu.kz',
        port: '',
      },
    ],
    // domains: ['shoqan-api.devhouse.kz'],  
    unoptimized: true,
  },
};

export default nextConfig;
