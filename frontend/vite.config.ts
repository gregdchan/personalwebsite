import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    sveltekit(),
    tailwindcss() // OK with Tailwind v4; keep after sveltekit is also fine
  ],

  // If you do NOT need to force a single CSS or externalize assets, you can drop these.
  build: {
    cssCodeSplit: false,    // keep if you want a single CSS file
    assetsInlineLimit: 0,   // keep if you want zero inlined data URIs
    // If you truly need to keep refractor langs external at runtime, uncomment below
    // rollupOptions: {
    //   external: [
    //     'refractor/lang/bash.js',
    //     'refractor/lang/javascript.js',
    //     'refractor/lang/json.js',
    //     'refractor/lang/jsx.js',
    //     'refractor/lang/typescript.js'
    //   ]
    // }
  },

  // Prebundle GSAP for faster dev starts; prevent externalization in SSR.
  optimizeDeps: { include: ['gsap'] },
  ssr: { noExternal: ['gsap'] },

  // Only keep aliases if you removed `external` and you *must* force a specific file path.
  // Otherwise, you can remove this whole alias block.
  resolve: {
    alias: [
      { find: 'refractor/lang/bash.js',
        replacement: path.resolve(__dirname, 'node_modules/refractor/lang/bash.js') },
      { find: 'refractor/lang/javascript.js',
        replacement: path.resolve(__dirname, 'node_modules/refractor/lang/javascript.js') },
      { find: 'refractor/lang/json.js',
        replacement: path.resolve(__dirname, 'node_modules/refractor/lang/json.js') },
      { find: 'refractor/lang/jsx.js',
        replacement: path.resolve(__dirname, 'node_modules/refractor/lang/jsx.js') },
      { find: 'refractor/lang/typescript.js',
        replacement: path.resolve(__dirname, 'node_modules/refractor/lang/typescript.js') }
    ]
  }
});
