// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Custom domain (bossliferentals.com) deploys at the site root.
// base is kept explicit so a future project-page deploy is a one-line change;
// all public asset URLs are built base-path-aware via BASE_URL in the layout.
export default defineConfig({
  site: 'https://bossliferentals.com',
  base: '/',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
