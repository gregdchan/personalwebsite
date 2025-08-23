// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { fetchTokens, fetchNav, fetchLogoUrl } from '$lib/sanity/client';

export const load: LayoutServerLoad = async ({ setHeaders }) => {
  const [tokensRaw, navigation, logoUrl] = await Promise.all([
    fetchTokens(),
    fetchNav(),
    fetchLogoUrl()
  ]);

  // Ensure a consistent shape:
  // - legacy usage: data.tokens.light / data.tokens.dark
  // - pre-hydration script: data.tokens.themes.light / .dark
  const tokens = tokensRaw ?? { light: null, dark: null };
  const tokensPayload = {
    ...tokens,
    themes: {
      light: tokens.light,
      dark: tokens.dark
    }
  };

  // Modest caching: browsers revalidate, CDN can cache for 60s
  setHeaders({
    'cache-control': 'public, max-age=0, s-maxage=60'
  });

  return {
    tokens: tokensPayload,
    navigation: navigation ?? null,
    logoUrl: logoUrl ?? null
  };
};
