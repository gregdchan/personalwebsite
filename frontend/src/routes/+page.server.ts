import type { PageServerLoad } from './$types';
import { getHomepage, getPosts, getProjects } from '$lib/sanity';

export const load: PageServerLoad = async () => {
  const [page, projects, posts] = await Promise.all([
    getHomepage(),
    getProjects({ limit: 6, featuredOnly: false }),
    getPosts({ limit: 3, featuredOnly: false })
  ]);

  return { page, projects, posts };
};
