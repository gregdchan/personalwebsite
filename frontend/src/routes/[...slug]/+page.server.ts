import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getPageBySlug, getProjectBySlug } from '$lib/sanity';

export const load: PageServerLoad = async ({ params }) => {
  const slug = params.slug;

  // 1. Try to fetch as a Page
  const page = await getPageBySlug(slug);
  if (page) return { page, type: 'page' };

  // 2. Try to fetch as a Project
  const project = await getProjectBySlug(slug);
  if (project) return { page: project, type: 'project' };

  // 3. Neither found
  throw error(404, { message: `Route not found: ${slug}` });
};