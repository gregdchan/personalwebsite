// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { getDesignToken, getNavigation } from '$lib/sanity';

export const load: LayoutServerLoad = async () => {
  const [tokens, navigation] = await Promise.all([
    getDesignToken(),
    getNavigation()
  ]);

  return {
    tokens,
    navigation
  };
};
