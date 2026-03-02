import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],

  // Prebundle GSAP for faster dev starts; prevent externalization in SSR.
  optimizeDeps: { include: ['gsap'] },
  ssr: { noExternal: ['gsap'] }
});
