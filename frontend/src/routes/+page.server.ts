import type { PageServerLoad } from './$types';
import { getHomepage, getPosts, getProjects } from '$lib/sanity';

export const load: PageServerLoad = async ({ setHeaders }) => {
  setHeaders({
    'cache-control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300'
  });

  const [page, projects, posts] = await Promise.all([
    getHomepage(),
    getProjects({ limit: 3, featuredOnly: true }),
    getPosts({ limit: 2, featuredOnly: true })
  ]);

  return { page, projects, posts };
};
