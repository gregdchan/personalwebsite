// src/routes/+layout.server.ts
import { getNavigation, getDesignTokens } from '$lib/sanity';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  const [navigation, tokens] = await Promise.all([
    getNavigation(),
    getDesignTokens()
  ]);

  if (!tokens) {
    // Optionally: throw error(500, 'Failed to load tokens');
    return {
      navigation,
      tokens: {} // fallback to empty object
    };
  }

  return {
    navigation,
    tokens
  };
};
