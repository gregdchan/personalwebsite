import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    outDir: '.svelte-kit-local',
    adapter: adapter({
      out: 'build'
    })
  }
};

export default config;
