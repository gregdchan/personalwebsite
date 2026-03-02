import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getProjectBySlug } from '$lib/sanity';

export const load: PageServerLoad = async ({ params }) => {
  const project = await getProjectBySlug(params.slug);
  if (!project) throw error(404, { message: `Project not found: ${params.slug}` });

  return { project };
};
