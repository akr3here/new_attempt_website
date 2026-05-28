import { defineCollection, z } from 'astro:content';

const writings = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

const logs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const quotes = defineCollection({
  type: 'data',
  schema: z.object({
    text: z.string(),
    author: z.string(),
    source: z.string().optional(),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date().optional(),
  }),
});

const links = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
  }),
});

const bookshelf = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    year: z.number().optional(),
    status: z.enum(['read', 'reading', 'want-to-read']).default('read'),
    rating: z.number().min(1).max(5).optional(),
    note: z.string().optional(),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date().optional(),
  }),
});
const problems = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    solved: z.boolean().default(false),
    date: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const ideas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
    threads: z.array(z.object({
      text: z.string(),
      date: z.coerce.date(),
    })).default([]),
  }),
});

export const collections = { writings, logs, quotes, links, bookshelf, problems, ideas, };
