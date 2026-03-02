import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getPostBySlug } from '$lib/sanity';

export const load: PageServerLoad = async ({ params }) => {
  const post = await getPostBySlug(params.slug);
  if (!post) throw error(404, { message: `Post not found: ${params.slug}` });

  return { post };
};
