// src/lib/stores/themeStore.ts
import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

// Initialize from localStorage or system preference
const initial: Theme = browser
  ? (localStorage.getItem('theme') as Theme) ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  : 'light';

export const theme = writable<Theme>(initial);

// Keep `<html>` class and localStorage in sync
theme.subscribe((value) => {
  if (!browser) return;
  document.documentElement.classList[value === 'dark' ? 'add' : 'remove']('dark');
  localStorage.setItem('theme', value);
});

// Toggle helper
export function toggleTheme() {
  theme.update((cur) => (cur === 'dark' ? 'light' : 'dark'));
}
