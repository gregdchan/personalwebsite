// src/lib/sanity.ts
import { createClient, type SanityClient } from '@sanity/client'
import type { Navigation } from '$lib/types/navigation'
import type { DesignToken } from '$lib/types/designToken'

import type { BlogPost } from "$lib/types/blogPost"

const client: SanityClient = createClient({
  projectId: 'smxz6rsz',
  dataset:   'production',
  apiVersion:'2024-01-01',
  useCdn:     process.env.NODE_ENV === 'production',
})

export async function getNavigation(): Promise<Navigation | null> {
  const query = `*[_type=="navigation" && slug.current=="main-menu"][0]{
    _id, _type, title, slug,
    items[]{ text, link, target, children[]{ text, link, target } }
  }`
  try {
    return await client.fetch<Navigation>(query)
  } catch (err) {
    console.error('Sanity fetch error for navigation:', err)
    return null
  }
}
export async function getDesignToken(): Promise<DesignToken | null> {
  const tokens = await client.fetch<DesignToken[]>(`
    *[_type=="designToken"] | order(_createdAt desc)[0]
  `);
  return tokens[0] || null;
}
export async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type=="blogPost"] | order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt
  }`;
  try {
    return await client.fetch<BlogPost[]>(query);
  } catch (err) {
    console.error('Sanity fetch error for blog posts:', err);
    return [];
  }
}
