import type { PageServerLoad } from './$types';
import { getHomepage, getProjects } from '$lib/sanity';

export const load: PageServerLoad = async () => {
  const [page, projects] = await Promise.all([
    getHomepage(),
    getProjects({ limit: 6, featuredOnly: false })
  ]);

  return { page, projects };
};
