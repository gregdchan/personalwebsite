import { getHomePage } from '$lib/sanity';

export async function load() {
	const homePage = await getHomePage();

	if (!homePage) {
		console.error('No homepage found with isIndexPage=true');
	}

	return {
		homePage
	};
}
