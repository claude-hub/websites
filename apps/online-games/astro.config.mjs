import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import { remarkModifiedTime } from './scripts/remark-modified-time.mjs';

import mdx from '@astrojs/mdx';

export default defineConfig({
	site: 'https://claude-hub.cn',
	integrations: [
		tailwind(),
		sitemap({
			// 设置 sitemap 分页，每页最多 5000 条
			entryLimit: 5000
		}),
		mdx()
	],
	output: 'static',
	devToolbar: {
		enabled: false
	},
	markdown: {
		remarkPlugins: [remarkModifiedTime]
	},
	trailingSlash: 'always',
	build: {
		assets: 'assets'
	}
});
