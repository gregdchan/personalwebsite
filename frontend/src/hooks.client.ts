import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = ({ error, status }) => {
	// When a new deployment happens, old chunk URLs 404.
	// Reload the page so the browser fetches the new HTML with correct chunk references.
	if (
		status === 404 ||
		(error instanceof TypeError && error.message.includes('dynamically imported module'))
	) {
		window.location.reload();
		return;
	}
};
