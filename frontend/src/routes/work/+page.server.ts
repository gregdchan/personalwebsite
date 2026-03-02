import type { PageServerLoad } from './$types';
import { getPageBySlug, getProjects } from '$lib/sanity';

export const load: PageServerLoad = async ({ setHeaders }) => {
  setHeaders({
    'cache-control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300'
  });

  const [page, projects] = await Promise.all([getPageBySlug('work'), getProjects({ limit: 24 })]);
  return { page, projects };
};
