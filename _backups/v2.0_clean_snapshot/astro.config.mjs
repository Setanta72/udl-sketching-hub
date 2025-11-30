import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],

  // IMPORTANT: Update these for GitHub Pages deployment
  // If deploying to: https://<username>.github.io/udl-sketching-hub/
  // Then set: site: 'https://<username>.github.io'
  //           base: '/udl-sketching-hub'
  //
  // If deploying to: https://<username>.github.io/ (root of user/org site)
  // Then set: site: 'https://<username>.github.io'
  //           base: '/' (or omit base)
  // site: 'https://yourusername.github.io', // Update with YOUR GitHub username
  // base: '/udl-sketching-hub', // Update if your repo name is different

  output: 'static',

  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  }
});
