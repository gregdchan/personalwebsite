import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { DesignToken } from '$lib/types/designToken';
import type { Navigation } from '$lib/types/navigation';
import { LOGO_QUERY } from './queries';

export const sanity = createClient({
	projectId: 'smxz6rsz',
	dataset: 'production',
	apiVersion: '2024-01-01',
	useCdn: process.env.NODE_ENV === 'production'
});

export async function fetchTokens(): Promise<{
	light: DesignToken | null;
	dark: DesignToken | null;
}> {
	const query = `{
    "light": *[_type == "designToken" && mode == "light" && isDefault == true][0],
    "dark": *[_type == "designToken" && mode == "dark" && isDefault == true][0]
  }`;
	return await sanity.fetch(query);
}

export async function fetchNav(): Promise<Navigation | null> {
	const query = `*[_type == "navigation" && slug.current == "main-menu"][0]{
    items[]{
      text,
      link{
        external,
        internal->{
          slug
        }
      },
      target,
      children[]{
        text,
        link{
          external,
          internal->{
            slug
          }
        },
        target
      }
    }
  }`;
	return await sanity.fetch(query);
}

export async function fetchLogoUrl(): Promise<string | null> {
	const logoAsset = await sanity.fetch(LOGO_QUERY);
	if (!logoAsset) return null;
	const builder = imageUrlBuilder(sanity);
	return builder.image(logoAsset).width(360).format('png').quality(95).url();
}
