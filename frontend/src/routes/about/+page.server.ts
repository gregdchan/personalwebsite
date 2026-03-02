import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getPageBySlug } from '$lib/sanity';

export const load: PageServerLoad = async ({ setHeaders }) => {
  setHeaders({
    'cache-control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300'
  });

  const page = (await getPageBySlug('about')) || (await getPageBySlug('about-me'));
  if (!page) throw error(404, { message: 'About page not found' });

  return { page };
};
