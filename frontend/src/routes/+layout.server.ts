// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { fetchTokens, fetchNav } from '$lib/sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '$lib/sanity/client'; // if you already export client here

export const load: LayoutServerLoad = async () => {
  const [tokens, navDoc, site] = await Promise.all([
    fetchTokens(),
    fetchNav(),
    // adjust the query to match your settings doc
    client.fetch(`*[_type=="siteSettings"][0]{logo}`)
  ]);

  const builder = imageUrlBuilder(client);
  const logoUrl = site?.logo
    ? builder.image(site.logo).width(360).format('png').quality(95).url()
    : null;

  return {
    tokens,                         // your single DesignToken (unchanged)
    navigation: navDoc || null,     // (unchanged)
    logoUrl                         // NEW: single fixed URL string
  };
};
