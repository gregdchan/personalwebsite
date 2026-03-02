// @ts-nocheck
import type { PageServerLoad } from './$types';
import { getPageBySlug, getPosts } from '$lib/sanity';

export const load = async () => {
  const [page, posts] = await Promise.all([getPageBySlug('play'), getPosts()]);
  return { page, posts };
};
;null as any as PageServerLoad;