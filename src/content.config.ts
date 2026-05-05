import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date(),
    dateModified: z.coerce.date().optional(),
    category: z.string(),
    featuredImage: z.string().optional(),
    ogImage: z.string().optional(),
    canonical: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    /** บรรทัดเดียวหรือสั้น ๆ — แสดงเหนือเนื้อหาเพื่อ AEO / อ่านไว */
    summary: z.string().optional(),
    faqs: z.array(faqSchema).default([]),
    relatedLinks: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          description: z.string().optional(),
        }),
      )
      .default([]),
    ctaText: z.string().optional(),
  }),
});

const models = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/models' }),
  schema: z.object({
    kind: z.literal('model').default('model'),
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    /** ถ้ามี จะใช้เป็น <title> แทนรูปแบบดีฟอลต์ */
    seoTitle: z.string().optional(),
    /** ถ้ามี จะใช้เป็น H1 แทนรูปแบบดีฟอลต์ */
    h1: z.string().optional(),
    featuredImage: z.string().optional(),
    popularModels: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    faqs: z.array(faqSchema).default([]),
    ctaText: z.string().optional(),
  }),
});

const conditions = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/conditions' }),
  schema: z.object({
    kind: z.literal('condition').default('condition'),
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    seoTitle: z.string().optional(),
    h1: z.string().optional(),
    featuredImage: z.string().optional(),
    whatWeBuy: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    faqs: z.array(faqSchema).default([]),
    ctaText: z.string().optional(),
  }),
});

const locations = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/locations' }),
  schema: z.object({
    kind: z.literal('location').default('location'),
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    /** ถ้าไม่ระบุ หน้า [slug] จะสร้าง title tag ตามรูปแบบรับซื้อไอโฟน + จังหวัด + @webuy */
    seoTitle: z.string().optional(),
    /** ถ้าไม่ระบุ จะใช้รูปแบบ H1 มาตรฐานของหน้าพื้นที่ */
    h1: z.string().optional(),
    region: z.string().optional(),
    featuredImage: z.string().optional(),
    subAreas: z.array(z.string()).default([]),
    meetingOptions: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    faqs: z.array(faqSchema).default([]),
    ctaText: z.string().optional(),
  }),
});

export const collections = {
  blog,
  models,
  conditions,
  locations,
};

