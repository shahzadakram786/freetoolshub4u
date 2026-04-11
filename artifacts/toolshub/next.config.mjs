/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@workspace/api-client-react"],
  // Since we are migrating from Vite and have a public folder
  images: {
    unoptimized: true
  },
  // Required for @imgly/background-removal WASM support
  webpack: (config, { isServer }) => {
    // Handle WASM files
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    // Prevent server-side bundling of heavy client-only AI packages
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("@imgly/background-removal");
    }
    return config;
  },
  async rewrites() {
    return {
      // 'afterFiles' rewrites only apply when no local API route handles the request.
      // This ensures /api/weather and /api/weather/by-coords (our local routes) are
      // used first, while all other /api/* paths still proxy to the backend.
      afterFiles: [
        {
          source: '/api/:path*',
          destination: process.env.API_URL
            ? `${process.env.API_URL}/api/:path*`
            : 'http://127.0.0.1:5000/api/:path*',
        },
      ],
    };
  }
};

export default nextConfig;
