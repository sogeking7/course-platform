/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shoqan-api.devhouse.kz',
        port: '',
      },
    ],
    // domains: ['shoqan-api.devhouse.kz'],  
    unoptimized: true,
  },
};

export default nextConfig;
