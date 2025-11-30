import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],

  // IMPORTANT: Update these for GitHub Pages deployment
  site: 'https://Setanta72.github.io',
  base: '/udl-sketching-hub/',

  output: 'static',

  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  }
});
