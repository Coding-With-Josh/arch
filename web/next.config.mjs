/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
	remotePatterns: [
	  {
		protocol: 'https',
		hostname: 'www.launchuicomponents.com',
	  },
	  {
		protocol: 'https',
		hostname: 'www.cdn.dribbble.com',
	  },
	  {
		protocol: 'https',
		hostname: 'www.ferf1mheo22r9ira.public.blob.vercel-storage.com',
	  },
	],
  },
  eslint: {
	"ignoreDuringBuilds": true
  },
  typescript: {
	"ignoreBuildErrors": true
  }
};

export default nextConfig;
