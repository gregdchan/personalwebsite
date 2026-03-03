import type { PageServerLoad } from './$types';
import { getPageBySlug, getProjects } from '$lib/sanity';

export const load: PageServerLoad = async ({ url }) => {
  const activeTag = (url.searchParams.get('tag') || '').trim();
  const [page, projects] = await Promise.all([
    getPageBySlug('work'),
    getProjects({ limit: 24, tag: activeTag })
  ]);
  return { page, projects, activeTag };
};
