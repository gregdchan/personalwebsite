import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],

  // OPTION A: mark them external so Vite leaves the imports alone
  build: {
    rollupOptions: {
      external: [
        'refractor/lang/bash.js',
        'refractor/lang/javascript.js',
        'refractor/lang/json.js',
        'refractor/lang/jsx.js',
        'refractor/lang/typescript.js',
      ]
    }
  },

  // OPTION B: alias each to the real file on disk so Vite bundles them
  resolve: {
    alias: [
      {
        find: 'refractor/lang/bash.js',
        replacement: path.resolve(__dirname, 'node_modules/refractor/lang/bash.js')
      },
      {
        find: 'refractor/lang/javascript.js',
        replacement: path.resolve(__dirname, 'node_modules/refractor/lang/javascript.js')
      },
      {
        find: 'refractor/lang/json.js',
        replacement: path.resolve(__dirname, 'node_modules/refractor/lang/json.js')
      },
      {
        find: 'refractor/lang/jsx.js',
        replacement: path.resolve(__dirname, 'node_modules/refractor/lang/jsx.js')
      },
      {
        find: 'refractor/lang/typescript.js',
        replacement: path.resolve(__dirname, 'node_modules/refractor/lang/typescript.js')
      },
    ]
  },

  test: {
    workspace: [
      {
        extends: './vite.config.ts',
        plugins: [svelteTesting()],
        test: {
          name: 'client',
          environment: 'jsdom',
          clearMocks: true,
          include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
          exclude: ['src/lib/server/**'],
          setupFiles: ['./vitest-setup-client.ts']
        }
      },
      {
        extends: './vite.config.ts',
        test: {
          name: 'server',
          environment: 'node',
          include: ['src/**/*.{test,spec}.{js,ts}'],
          exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
        }
      }
    ]
  }
});
