// @ts-nocheck
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getPageBySlug } from '$lib/sanity';

export const load = async ({ params }: Parameters<PageServerLoad>[0]) => {
	const page = await getPageBySlug(params.slug);
	if (page) return { page };
	throw error(404, { message: `Route not found: ${params.slug}` });
};
