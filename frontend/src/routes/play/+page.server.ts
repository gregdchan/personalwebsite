import type { PageServerLoad } from './$types';
import { getPageBySlug, getPosts } from '$lib/sanity';

export const load: PageServerLoad = async ({ url }) => {
  const activeTag = (url.searchParams.get('tag') || '').trim();
  const [page, posts] = await Promise.all([
    getPageBySlug('play'),
    getPosts({ limit: 24, tag: activeTag })
  ]);
  return { page, posts, activeTag };
};
