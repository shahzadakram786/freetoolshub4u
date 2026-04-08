/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@workspace/api-client-react"],
  // Since we are migrating from Vite and have a public folder
  images: {
    unoptimized: true
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.API_URL
          ? `${process.env.API_URL}/api/:path*`
          : 'http://127.0.0.1:5000/api/:path*',
      },
    ];
  }
};

export default nextConfig;
