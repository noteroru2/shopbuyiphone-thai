// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://ร้านรับซื้อไอโฟน.com/',
  trailingSlash: 'always',
  devToolbar: {
    enabled: false,
  },
  integrations: [sitemap(), mdx()],

  vite: {
    cacheDir: '.cache/vite',
    plugins: [tailwindcss()],
  },
});
