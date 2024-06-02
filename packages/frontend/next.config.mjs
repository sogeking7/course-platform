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
    // domains: ['localhost', 'shoqan-api.devhouse.kz'],
  },
};

export default nextConfig;
