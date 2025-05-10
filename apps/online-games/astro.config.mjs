import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import { remarkModifiedTime } from './scripts/remark-modified-time.mjs';

import mdx from '@astrojs/mdx';

export default defineConfig({
	site: 'https://claude-hub.cn',
	integrations: [tailwind(), sitemap(), mdx()],
	output: 'static',
	devToolbar: {
		enabled: false
	},
	markdown: {
		remarkPlugins: [remarkModifiedTime]
	},
	trailingSlash: 'never',
	build: {
		assets: 'assets'
	}
});
