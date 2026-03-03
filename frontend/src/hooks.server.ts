import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Immutable assets (hashed filenames) can be cached forever —
	// they'll get new URLs on the next build anyway.
	if (event.url.pathname.startsWith('/_app/immutable/')) {
		response.headers.set('cache-control', 'public, max-age=31536000, immutable');
	}

	return response;
};
