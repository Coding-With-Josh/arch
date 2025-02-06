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
	],
  },
};

export default nextConfig;
