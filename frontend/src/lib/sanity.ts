import { createClient } from '@sanity/client';
import type { DesignToken } from '$lib/types/designToken';

export const client = createClient({
  projectId: 'smxz6rsz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true
});

// Minimal queries (avoid fancy projections to keep it robust)
export async function getNavigation(): Promise<any | null> {
  const query = `*[_type == "navigation"][0]{
    items[]{
      text,
      link,
      // Canonical href for all shapes
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
  return client.fetch(query).catch(() => null);
}

export async function getDesignTokens(): Promise<{ light: DesignToken | null; dark: DesignToken | null }> {
  const query = `{
    "light": *[_type == "designToken" && mode == "light" && isDefault == true][0]{
      _id, themeName, mode, isDefault,
      logo{alt, asset->{url}},
      colors, typography, spacing,
      lightTheme{ logo{alt, asset->{url}}, colors, typography, spacing },
      darkTheme{  logo{alt, asset->{url}}, colors, typography, spacing }
    },
    "dark": *[_type == "designToken" && mode == "dark" && isDefault == true][0]{
      _id, themeName, mode, isDefault,
      logo{alt, asset->{url}},
      colors, typography, spacing,
      lightTheme{ logo{alt, asset->{url}}, colors, typography, spacing },
      darkTheme{  logo{alt, asset->{url}}, colors, typography, spacing }
    }
  }`;
  try {
    return await client.fetch(query);
  } catch {
    return { light: null, dark: null };
  }
}

export async function getHomepage(): Promise<any | null> {
  const query = `*[_type == "page" && isIndexPage == true][0]{ title, description }`;
  return client.fetch(query).catch(() => null);
}

export async function getPageBySlug(slug: string): Promise<any | null> {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    title,
    description,
    body
  }`;
  return client.fetch(query, { slug }).catch(() => null);
}

export async function getErrorPages(): Promise<{ notFound: any | null; generic: any | null }> {
  const query = `{
    "notFound": *[_type == "errorPage" && key == "notFound"][0]{
      title, message, ctaLabel, ctaHref
    },
    "generic": *[_type == "errorPage" && key == "generic"][0]{
      title, message, ctaLabel, ctaHref
    }
  }`;
  return client.fetch(query).catch(() => ({ notFound: null, generic: null }));
}