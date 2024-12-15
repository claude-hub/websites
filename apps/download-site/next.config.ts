import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	// output: 'export'

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'play-lh.googleusercontent.com'
			}
		]
	}
};

export default nextConfig;
