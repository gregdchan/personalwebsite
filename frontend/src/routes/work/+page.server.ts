import type { PageServerLoad } from './$types';
import { getPageBySlug, getProjects } from '$lib/sanity';

export const load: PageServerLoad = async () => {
  const [page, projects] = await Promise.all([getPageBySlug('work'), getProjects()]);
  return { page, projects };
};
