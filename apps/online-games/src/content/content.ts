import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	loader: glob({ base: './content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		img: z.string().optional()
	})
});

const games = defineCollection({
	type: 'data',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		img: z.string().optional()
	})
});

export const collections = { blog, games };
