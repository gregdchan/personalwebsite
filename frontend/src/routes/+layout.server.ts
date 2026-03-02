import type { LayoutServerLoad } from './$types';
import { getNavigation, getDesignTokens, getErrorPages } from '$lib/sanity';

export const load: LayoutServerLoad = async ({ setHeaders }) => {
  setHeaders({
    'cache-control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300'
  });

  const [navigation, tokens, errorPages] = await Promise.all([
    getNavigation(),
    getDesignTokens(),
    getErrorPages()
  ]);

  return { navigation, tokens, errorPages };
};
