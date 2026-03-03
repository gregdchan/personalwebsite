import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  vitePlugin: {
    dynamicCompileOptions({ filename }) {
      // Third-party Svelte packages often still use legacy $$props/$$restProps.
      if (filename.includes('node_modules')) {
        return { runes: false };
      }

      // Keep runes mode active for app source files.
      if (filename.includes('/src/')) {
        return { runes: true };
      }

      return {};
    }
  },
  kit: {
    adapter: adapter({
      out: 'build'
    }),
    version: {
      name: process.env.RAILWAY_DEPLOYMENT_ID || Date.now().toString(),
      pollInterval: 60000
    }
  }
};

export default config;
