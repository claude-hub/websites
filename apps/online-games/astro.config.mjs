import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://claude-hub.cn',
	integrations: [tailwind(), sitemap()],
	output: 'static',
	devToolbar: {
		enabled: false
	},
	build: {
		assets: 'assets'
	}
});
