// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { fetchTokens, fetchNav, fetchLogoUrl } from '$lib/sanity/client';

export const load: LayoutServerLoad = async () => {
        const [tokens, navigation, logoUrl] = await Promise.all([
                fetchTokens(),
                fetchNav(),
                fetchLogoUrl()
        ]);

        return { tokens, navigation: navigation || null, logoUrl };
};
