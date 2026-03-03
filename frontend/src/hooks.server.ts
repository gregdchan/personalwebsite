import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	if (event.url.pathname.startsWith('/_app/immutable/')) {
		if (response.ok) {
			// Immutable assets (hashed filenames) can be cached forever —
			// they'll get new URLs on the next build anyway.
			response.headers.set('cache-control', 'public, max-age=31536000, immutable');
		} else {
			// Never cache 404s for chunks — they may exist after a deploy completes.
			response.headers.set('cache-control', 'no-store');
		}
	}

	return response;
};
