import type { LayoutServerLoad } from './$types';
import { getNavigation, getDesignTokens, getErrorPages } from '$lib/sanity';

export const load: LayoutServerLoad = async () => {
  const [navigation, tokens, errorPages] = await Promise.all([
    getNavigation(),
    getDesignTokens(),
    getErrorPages()
  ]);

  return { navigation, tokens, errorPages };
};
