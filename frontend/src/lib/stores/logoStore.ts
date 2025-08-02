import { writable } from 'svelte/store';

type LogoCache = {
  url: string;
  srcset: string;
  alt: string;
};

export const logoCache = writable<LogoCache | null>(null);