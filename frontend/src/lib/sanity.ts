import { createClient } from '@sanity/client';
import type { DesignToken } from '$lib/types/designToken';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID!;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: import.meta.env.PROD, // no CDN in dev to avoid stale reads
  perspective: 'published'
});

// Minimal queries (avoid fancy projections to keep it robust)
export async function getNavigation(): Promise<any | null> {
  const query = `*[_type == "navigation"][0]{
    items[]{
      text,
      link,
      "href": select(
        defined(link.external) => link.external,
        defined(link.url) => link.url,
        defined(link.internal->slug.current) => "/" + link.internal->slug.current,
        defined(link->slug.current) => "/" + link->slug.current,
        defined(link.slug.current) => "/" + link.slug.current,
        defined(link.slug) => "/" + link.slug,
        true => null
      )
    }
  }`;
  try {
    return await client.fetch(query, {}, { perspective: 'published' });
  } catch {
    return null;
  }
}

export async function getDesignTokens(): Promise<{ light: DesignToken | null; dark: DesignToken | null }> {
  const query = `{
    "light": *[_type == "designToken" && mode == "light"] | order(isDefault desc, _updatedAt desc)[0]{
      _id, themeName, mode, isDefault,
      logo{alt, asset->{url}},
      colors, typography, spacing,
      lightTheme{ logo{alt, asset->{url}}, colors, typography, spacing },
      darkTheme{  logo{alt, asset->{url}}, colors, typography, spacing }
    },
    "dark": *[_type == "designToken" && mode == "dark"] | order(isDefault desc, _updatedAt desc)[0]{
      _id, themeName, mode, isDefault,
      logo{alt, asset->{url}},
      colors, typography, spacing,
      lightTheme{ logo{alt, asset->{url}}, colors, typography, spacing },
      darkTheme{  logo{alt, asset->{url}}, colors, typography, spacing }
    }
  }`;
  try {
    return await client.fetch(query, {}, { perspective: 'published' });
  } catch {
    return { light: null, dark: null };
  }
}

export async function getHomepage(): Promise<any | null> {
  const query = `*[_type == "page" && isIndexPage == true][0]{
    title,
    description,
    "hero": sections[_type in ["hero","pictureHero","videoHero"]][0]{
      _type,
      "heading": coalesce(heading, title),
      "subheading": coalesce(subheading, subtitle),
      backgroundType,
      backgroundImage{
        alt,
        asset->{ url }
      },
      backgroundVideo,
      backgroundColor,
      secondaryColor,
      cta
    }
  }`;
  try {
    return await client.fetch(query, {}, { perspective: 'published' });
  } catch {
    return null;
  }
}

export async function getPageBySlug(slug: string): Promise<any | null> {
  const query = `*[_type == "page" && slug.current == $slug][0]{ title, description, body }`;
  try {
    return await client.fetch(query, { slug }, { perspective: 'published' });
  } catch {
    return null;
  }
}

export async function getErrorPages(): Promise<{ notFound: any | null; generic: any | null }> {
  const query = `{
    "notFound": *[_type == "errorPage" && key == "notFound"][0]{ title, message, ctaLabel, ctaHref },
    "generic": *[_type == "errorPage" && key == "generic"][0]{ title, message, ctaLabel, ctaHref }
  }`;
  try {
    return await client.fetch(query, {}, { perspective: 'published' });
  } catch {
    return { notFound: null, generic: null };
  }
}