/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.launchuicomponents.com",
      },
      {
        protocol: "https",
        hostname: "www.cdn.dribbble.com",
      },
      {
        protocol: "https",
        hostname: "www.ferf1mheo22r9ira.public.blob.vercel-storage.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    serverActions: true,
  },
  async headers() {
    return [
      {
        source: "/dashboard/studio/editor",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
