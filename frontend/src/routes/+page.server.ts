import type { PageServerLoad } from './$types';
import { getHomepage, getPosts, getProjects } from '$lib/sanity';

export const load: PageServerLoad = async () => {
  const [page, projects, posts] = await Promise.all([
    getHomepage(),
    getProjects({ limit: 3, featuredOnly: true }),
    getPosts({ limit: 2, featuredOnly: true })
  ]);

  return { page, projects, posts };
};
