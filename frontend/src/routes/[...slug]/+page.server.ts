import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getPageBySlug } from '$lib/sanity';

export const load: PageServerLoad = async ({ params }) => {
	const requestedSlug = params.slug;

	// Chrome probes this path; avoid unnecessary CMS lookups and noise.
	if (requestedSlug.startsWith('.well-known/')) {
		throw error(404, { message: `Route not found: ${requestedSlug}` });
	}

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
