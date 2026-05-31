// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Canonical origin — also feeds the sitemap and absolute asset URLs.
  site: 'https://interpreterofbiology.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
