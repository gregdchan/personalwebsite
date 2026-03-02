import type { PageServerLoad } from './$types';
import { getPageBySlug, getPosts } from '$lib/sanity';

export const load: PageServerLoad = async ({ setHeaders }) => {
  setHeaders({
    'cache-control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300'
  });

  const [page, posts] = await Promise.all([getPageBySlug('play'), getPosts({ limit: 24 })]);
  return { page, posts };
};
