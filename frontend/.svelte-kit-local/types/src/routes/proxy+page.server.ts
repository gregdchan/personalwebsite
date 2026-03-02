// @ts-nocheck
import type { PageServerLoad } from './$types';
import { getHomepage, getPosts, getProjects } from '$lib/sanity';

export const load = async () => {
  const [page, projects, posts] = await Promise.all([
    getHomepage(),
    getProjects({ limit: 6 }),
    getPosts({ limit: 4 })
  ]);

  return { page, projects, posts };
};
;null as any as PageServerLoad;