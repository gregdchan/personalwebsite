// src/lib/stores/themeStore.ts
import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// Define the Theme type
type Theme = 'light' | 'dark';

const designTokens: Record<Theme, Record<string, string>> = {
	light: {
		'--background': '#ffffff',
		'--foreground': '#000000',
		'--primary': '#1a73e8'
	},
	dark: {
		'--background': '#000000',
		'--foreground': '#ffffff',
		'--primary': '#bb86fc'
	}
};

// Initialize from localStorage or system preference
function getInitialTheme(): Theme {
	if (typeof localStorage !== 'undefined') {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme === 'light' || savedTheme === 'dark') {
			return savedTheme;
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	return 'light';
}

export const theme = writable<Theme>(getInitialTheme());

// Apply design tokens and sync with `<html>` class and localStorage
theme.subscribe((value) => {
	if (!browser) return;

	document.documentElement.classList.toggle('dark', value === 'dark');

	// Apply design tokens
	const tokens = designTokens[value];
	for (const [key, val] of Object.entries(tokens)) {
		document.documentElement.style.setProperty(key, val);
	}

	localStorage.setItem('theme', value);
});

// Toggle helper
export function toggleTheme() {
	theme.update((cur) => (cur === 'dark' ? 'light' : 'dark'));
}

export function setTheme(value: Theme) {
	theme.set(value);
}

if (browser) {
	const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
	mediaQuery.addEventListener('change', (event) => {
		theme.set(event.matches ? 'dark' : 'light');
	});
}
