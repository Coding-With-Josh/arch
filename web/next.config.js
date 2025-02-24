/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...existing config
  experimental: {
    // ...existing experimental options
    serverActions: true,
  },
  async headers() {
    return [
      {
        source: '/dashboard/studio/editor',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
