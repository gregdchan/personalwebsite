import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getPageBySlug } from '$lib/sanity';

export const load: PageServerLoad = async ({ params }) => {
  const slug = params.slug; // e.g. "about" or "blog/post"
  const page = await getPageBySlug(slug);
  if (!page) throw error(404, 'Not found');
  return { page };
};