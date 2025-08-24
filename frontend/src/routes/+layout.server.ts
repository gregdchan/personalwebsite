// Define PageServerLoad locally if not exported from './$types'
type PageServerLoad = () => Promise<{ navigation: unknown; tokens: unknown; errorPages: unknown }>;
// If './$types' does not export PageServerLoad, verify the correct type or define it locally.
import { getNavigation, getDesignTokens, getErrorPages } from '$lib/sanity';

export const load: PageServerLoad = async () => {
  const [navigation, tokens, errorPages] = await Promise.all([
    getNavigation(),
    getDesignTokens(),
    getErrorPages()
  ]);

  return { navigation, tokens, errorPages };
};

content: ['./src/**/*.{html,js,svelte,ts}']