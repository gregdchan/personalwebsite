// stores/designTokensStore.ts
import { writable } from 'svelte/store';
import type { DesignToken } from '$lib/types/designToken';

export const designTokens = writable<DesignToken | null>(null);
