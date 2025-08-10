// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { fetchTokens, fetchNav, fetchLogoUrl } from '$lib/sanity/client';

export const load: LayoutServerLoad = async () => {
	const [tokens, navDoc, logoUrl] = await Promise.all([fetchTokens(), fetchNav(), fetchLogoUrl()]);

	return { tokens, navigation: navDoc || null, logoUrl };
};
