import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity';

const PAGE_Q = /* groq */ `*[_type == "page" && isIndexPage == true][0]{
  title,
  description,
  sections[]{
    ...,
    // pass through common asset urls (best-effort)
    image{alt, asset->{url}},
    backgroundImage{alt, asset->{url}},
    posterImage{alt, asset->{url}},
    photo{alt, asset->{url}},
    images[]{..., asset->{url}},
    testimonials[]{..., photo{alt, asset->{url}}}
  }
}`;

const PROJECTS_Q = /* groq */ `*[_type == "project"] | order(_updatedAt desc)[0..7]{
  _id, title, excerpt, slug, cover{alt, asset->{url}}, tags
}`;
const POSTS_Q = /* groq */ `*[_type == "post"] | order(_updatedAt desc)[0..3]{
  _id, title, excerpt, slug, cover{alt, asset->{url}} }`;
const TESTIMONIALS_Q = /* groq */ `*[_type == "testimonial"] | order(_updatedAt desc)[0..6]{ quote, author, role, photo{alt, asset->{url}} }`;

export const load: PageServerLoad = async () => {
  const [page, projects, posts, testimonials] = await Promise.all([
    client.fetch(PAGE_Q, {}),
    client.fetch(PROJECTS_Q, {}).catch(() => []),
    client.fetch(POSTS_Q, {}).catch(() => []),
    client.fetch(TESTIMONIALS_Q, {}).catch(() => [])
  ]);

  return { page, projects, posts, testimonials };
};