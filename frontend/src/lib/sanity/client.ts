import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { DesignToken } from '$lib/types/designToken';
import type { Navigation } from '$lib/types/navigation';
import { TOKEN_QUERY, NAV_QUERY, LOGO_QUERY } from './queries';

export const sanity = createClient({
        projectId: 'smxz6rsz',
        dataset: 'production',
        apiVersion: '2024-01-01',
        useCdn: process.env.NODE_ENV === 'production'
});

const builder = imageUrlBuilder(sanity);

export async function fetchTokens(): Promise<{
        light: DesignToken | null;
        dark: DesignToken | null;
}> {
        return await sanity.fetch(TOKEN_QUERY);
}

export async function fetchNav(): Promise<Navigation | null> {
        return await sanity.fetch(NAV_QUERY);
}

export async function fetchLogoUrl(): Promise<string | null> {
        const asset = await sanity.fetch(LOGO_QUERY);
        return asset ? builder.image(asset).width(360).format('png').quality(95).url() : null;
}
