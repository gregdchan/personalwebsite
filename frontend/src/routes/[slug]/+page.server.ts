import { getPage } from '$lib/sanity';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  // Fetch the page with all fields and references
  const page = await getPage(params.slug, {
    includeReferences: true,
    includeSections: true,
    includeRelated: true
  });

  if (!page) {
    throw error(404, 'Page not found');
  }

  return {
    page
  };
};