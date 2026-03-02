import type { PageServerLoad } from './$types';
import { getPageBySlug, getPosts } from '$lib/sanity';

export const load: PageServerLoad = async () => {
  const [page, posts] = await Promise.all([getPageBySlug('play'), getPosts({ limit: 24 })]);
  return { page, posts };
};
