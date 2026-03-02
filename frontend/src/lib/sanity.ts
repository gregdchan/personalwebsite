import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { DesignToken } from '$lib/types/designToken';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'placeholder';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

if (projectId === 'placeholder' || !projectId) {
  console.error('[sanity] ERROR: VITE_SANITY_PROJECT_ID is missing or set to placeholder! Check your .env file or build settings.');
} else {
  console.log(`[sanity] Initializing client for project: ${projectId}, dataset: ${dataset}`);
}

export const client = createClient({
  projectId: projectId === 'placeholder' ? 'smxz6rsz' : projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: import.meta.env.PROD,
  perspective: 'published' // previewDrafts requires a token!
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Minimal queries (avoid fancy projections to keep it robust)
export async function getNavigation(): Promise<any | null> {
  const query = `*[_type == "navigation"][0]{
    items[]{
      text,
      link,
      "href": select(
        link.internal->isIndexPage == true => "/",
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
  const cleanSlug = slug.startsWith('/') ? slug.substring(1) : slug;
  console.log(`[sanity] Fetching page for slug: "${cleanSlug}"`);

  // In DEV, we want to see drafts. In PROD, only published.
  const useCdn = import.meta.env.PROD;

  // Take the first matching document
  const query = /* groq */ `*[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    description,
    mainImage{ alt, asset->{url} },
    body[]{
      ...,
      _type == "image" => { ..., asset->{url} },
      markDefs[]{ ..., _type == "link" => { href, blank } }
    },
    sections[]{
      ...,
      "image": coalesce(image, backgroundImage, logo, companyLogo){ alt, asset->{url} },
      "items": coalesce(items, features, images, testimonials, skillsList, logos)[]{
        ...,
        "image": coalesce(image, icon, photo, logo, companyLogo){ alt, asset->{url} },
        body[]{ ..., _type == "image" => { ..., asset->{url} } },
        description[]{ ..., _type == "image" => { ..., asset->{url} } }
      },
      // Special case: inject projects for grids
      (_type == "projectGrid" || _type == "projectsGrid") => {
        "items": *[_type == "project"] | order(year desc, _updatedAt desc){
          _id, title, excerpt, slug, cover{alt, asset->{url}}, tags, category, year
        }
      }
    }
  }`;

  try {
    const result = await client.fetch(query, { slug: cleanSlug });

    if (!result) {
      console.warn(`[sanity] 404 - No document found with slug: "${cleanSlug}"`);
      // Try one more time looking for the base slug without any hierarchy
      if (cleanSlug.includes('/')) {
        const lastPart = cleanSlug.split('/').pop();
        return getPageBySlug(lastPart!);
      }
    } else {
      console.log(`[sanity] 200 - Successfully loaded: "${result.title}"`);
    }
    return result;
  } catch (e) {
    console.error(`[sanity] Error fetching page "${cleanSlug}":`, e);
    return null;
  }
}

export async function getProjectBySlug(slug: string): Promise<any | null> {
  const cleanSlug = slug.startsWith('/') ? slug.substring(1) : slug;
  console.log(`[sanity] Fetching project for slug: "${cleanSlug}"`);

  const query = /* groq */ `*[_type == "project" && slug.current == $slug][0]{
    ...,
    cover{ alt, asset->{url} },
    gallery[]{ ..., asset->{url} },
    body[]{
      ...,
      _type == "image" => { ..., asset->{url} },
      markDefs[]{ ..., _type == "link" => { href, blank } }
    },
    client{ logo{asset->{url}}, name },
    results[]{ ..., icon{asset->{url}} }
  }`;

  try {
    return await client.fetch(query, { slug: cleanSlug });
  } catch (e) {
    console.error(`[sanity] Error fetching project "${cleanSlug}":`, e);
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