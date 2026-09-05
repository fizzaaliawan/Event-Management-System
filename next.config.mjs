/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Prevent Windows/OneDrive file locking from corrupting the webpack disk cache
      config.cache = {
        type: "memory",
      }
    }
    return config
  },
}

export default nextConfig

