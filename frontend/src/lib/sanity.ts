// src/lib/sanity.ts
import { createClient, type SanityClient } from '@sanity/client'
import type { Navigation } from '$lib/types/navigation'
import type { DesignToken } from '$lib/types/designToken'
import type { BlogPost } from "$lib/types/blogPost"
import type { Page } from '$lib/types/page';

export const client: SanityClient = createClient({
  projectId: 'smxz6rsz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

export async function getNavigation(): Promise<Navigation | null> {
  const query = `*[_type == "navigation" && slug.current == "main-menu"][0]{
    items[]{
      text,
      link{
        external,
        internal->{
          slug
        }
      },
      target,
      children[]{
        text,
        link{
          external,
          internal->{
            slug
          }
        },
        target
      }
    }
  }`;

  try {
    const result = await client.fetch(query);

    if (result?.items) {
      result.items = result.items.map((item: any) => ({
        ...item,
        link: item.link?.external || (item.link?.internal?.slug?.current ? `/${item.link.internal.slug.current}` : '#'),
        children: item.children?.map((child: any) => ({
          ...child,
          link: child.link?.external || (child.link?.internal?.slug?.current ? `/${child.link.internal.slug.current}` : '#')
        })) || []
      }));
    }

    return result;
  } catch (err) {
    console.error('Error fetching navigation:', err);
    return null;
  }
}

export async function getDesignToken(): Promise<DesignToken | null> {
  const query = `*[_type=="designToken"] | order(_createdAt desc)[0]`
  try {
    return await client.fetch<DesignToken>(query)
  } catch (err) {
    console.error('Sanity fetch error for design token:', err)
    return null
  }
}

export async function getDesignTokens(): Promise<{ light: DesignToken | null, dark: DesignToken | null }> {
  const query = `{
    "light": *[_type == "designToken" && mode == "light" && isDefault == true][0],
    "dark": *[_type == "designToken" && mode == "dark" && isDefault == true][0]
  }`;

  try {
    return await client.fetch(query);
  } catch (err) {
    console.error('Error fetching design tokens:', err);
    return { light: null, dark: null };
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type=="blogPost"] | order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    publishedAt
  }`;
  try {
    return await client.fetch<BlogPost[]>(query);
  } catch (err) {
    console.error('Sanity fetch error for blog posts:', err);
    return [];
  }
}

export async function getPage(slug: string, options: {
  includeReferences?: boolean;
  includeSections?: boolean;
  includeRelated?: boolean;
} = {}): Promise<Page | null> {
  const { 
    includeReferences = true, 
    includeSections = true, 
    includeRelated = false 
  } = options;
  
  // Base query with essential fields
  let query = `*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt,
      caption
    },
    description,
    body`;
    
  // Add sections handling if needed
  if (includeSections) {
    query += `,
    sections[] {
      _type,
      _key,
      // Expand hero section
      _type == "hero" => {
        heading,
        subheading,
        backgroundType,
        backgroundImage {
          asset-> {
            _id,
            url
          },
          alt,
          hotspot,
          crop
        },
        backgroundVideo,
        backgroundColor,
        secondaryColor,
        cta {
          text,
          link,
          style,
          target
        }
      }
      // You can add more section types here as your schema evolves
    }`;
  }
  
  // Add SEO
  query += `,
    seo {
      description,
      keywords,
      canonicalUrl,
      openGraph {
        title,
        description,
        image {
          asset-> {
            url
          }
        }
      },
      metaTags
    },
    isIndexPage`;
    
  // Close the query
  query += `}`;

  try {
    return await client.fetch(query, { slug });
  } catch (err) {
    console.error('Error fetching page:', err);
    return null;
  }
}

export async function getHomePage(): Promise<Page | null> {
  const query = `*[_type == "page" && isIndexPage == true][0]{
    _id,
    title,
    slug,
    mainImage,
    description,
    body,
    sections[]{
      _type,
      _key,
      // Expand all section types
      _type == "hero" => {
        heading,
        subheading,
        backgroundType,
        backgroundImage,
        backgroundVideo,
        backgroundColor,
        secondaryColor,
        cta
      },
      // Include other section types with their fields
    },
    seo
  }`;

  try {
    return await client.fetch(query);
  } catch (err) {
    console.error('Error fetching homepage:', err);
    return null;
  }
}