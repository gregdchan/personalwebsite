import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getPageBySlug } from '$lib/sanity';

export const load: PageServerLoad = async () => {
  const page = await getPageBySlug('about');
  if (!page) throw error(404, { message: 'About page not found' });

  return { page };
};
