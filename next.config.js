/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // Linting errors will fail the build
  },
};

module.exports = nextConfig;
