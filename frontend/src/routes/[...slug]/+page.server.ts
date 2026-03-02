import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getPageBySlug } from '$lib/sanity';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300'
	});

	const requestedSlug = params.slug;
	let page = await getPageBySlug(requestedSlug);

	// Handle legacy about slug mismatch during migration.
	if (!page && requestedSlug === 'about') {
		page = await getPageBySlug('about-me');
	}
	if (!page && requestedSlug === 'about-me') {
		page = await getPageBySlug('about');
	}

	if (page) return { page };
	throw error(404, { message: `Route not found: ${requestedSlug}` });
};
