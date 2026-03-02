import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { DesignToken } from '$lib/types/designToken';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'placeholder';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const configuredUseCdn = import.meta.env.VITE_SANITY_USE_CDN;
const useCdn = configuredUseCdn ? configuredUseCdn !== 'false' : true;

export const client = createClient({
  projectId: projectId === 'placeholder' ? 'smxz6rsz' : projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn,
  perspective: 'published' // previewDrafts requires a token!
});

const builder = imageUrlBuilder(client);
const cache = new Map<string, { expires: number; value: unknown }>();
const inflight = new Map<string, Promise<unknown>>();
const SANITY_TIMEOUT_MS = 3000;
const TTL_PAGE_MS = 2 * 60 * 1000;
const TTL_META_MS = 5 * 60 * 1000;

function cacheKey(scope: string, params?: unknown): string {
  return `${scope}:${params ? JSON.stringify(params) : ''}`;
}

async function withCache<T>(key: string, ttlMs: number, load: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && hit.expires > now) return hit.value as T;

  const pending = inflight.get(key);
  if (pending) return pending as Promise<T>;

  const request = load()
    .then((value) => {
      cache.set(key, { value, expires: Date.now() + ttlMs });
      inflight.delete(key);
      return value;
    })
    .catch((err) => {
      inflight.delete(key);
      throw err;
    });

  inflight.set(key, request as Promise<unknown>);
  return request;
}

async function fetchPublished<T>(
  query: string,
  params: Record<string, unknown> = {},
  timeoutMs = SANITY_TIMEOUT_MS
): Promise<T> {
  return Promise.race([
    client.fetch(query, params, { perspective: 'published' }),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Sanity request timed out')), timeoutMs)
    )
  ]) as Promise<T>;
}

export function urlFor(source: any) {
  return builder.image(source);
}

const IMAGE_PROJECTION = `{
  alt,
  asset->{url, metadata{dimensions}}
}`;

const PORTABLE_TEXT_PROJECTION = `[]{
  ...,
  _type == "image" => { ..., asset->{url, metadata{dimensions}} },
  markDefs[]{ ..., _type == "link" => { href, blank } }
}`;

const SECTION_PROJECTION = `[]{
  ...,
  image{alt, asset->{url, metadata{dimensions}}},
  backgroundImage{alt, asset->{url, metadata{dimensions}}},
  posterImage{alt, asset->{url, metadata{dimensions}}},
  mainImage{alt, asset->{url, metadata{dimensions}}},
  photo{alt, asset->{url, metadata{dimensions}}},
  logo{alt, asset->{url, metadata{dimensions}}},
  companyLogo{alt, asset->{url, metadata{dimensions}}},
  images[]{..., asset->{url, metadata{dimensions}}},
  testimonials[]{..., photo{alt, asset->{url, metadata{dimensions}}}},
  features[]{
    ...,
    image{alt, asset->{url, metadata{dimensions}}},
    icon{alt, asset->{url, metadata{dimensions}}}
  },
  logos[]{
    ...,
    logo{alt, asset->{url, metadata{dimensions}}}
  },
  items[]{
    ...,
    image{alt, asset->{url, metadata{dimensions}}},
    icon{alt, asset->{url, metadata{dimensions}}},
    photo{alt, asset->{url, metadata{dimensions}}}
  },
  _type == "projectGrid" => {
    ...,
    "items": *[_type in ["project", "portfolioProject"] && defined(slug.current)]
      | order(coalesce(order, 9999) asc, coalesce(year, 0) desc, coalesce(publishedAt, _updatedAt) desc)
      [0...coalesce(^.limit, 6)]{
      _id,
      _type,
      title,
      excerpt,
      slug,
      "cover": coalesce(cover, mainImage)${IMAGE_PROJECTION},
      "tags": coalesce(tags[]->title, tags[]),
      "category": coalesce(category, categories[0]->title, portfolioType),
      year,
      featured
    }
  }
}`;

function cleanSlug(slug: string): string {
  return (slug || '').replace(/^\/+|\/+$/g, '');
}

export async function getNavigation(): Promise<any | null> {
  const query = `*[_type == "navigation"][0]{
    title,
    items[]{
      text,
      target,
      link,
      "href": select(
        lower(text) == "work" => "/work",
        lower(text) == "play" => "/play",
        lower(text) == "about" => "/about",
        lower(text) == "contact" => "/contact",
        link.linkType == "external" && defined(link.external) => link.external,
        defined(link.internal->_type) && link.internal->_type in ["project", "portfolioProject"] && defined(link.internal->slug.current) => "/work/" + link.internal->slug.current,
        defined(link.internal->_type) && link.internal->_type == "blogPost" && defined(link.internal->slug.current) => "/play/" + link.internal->slug.current,
        defined(link.internal->_type) && link.internal->_type == "post" && defined(link.internal->slug.current) => "/play/" + link.internal->slug.current,
        defined(link.internal->_type) && link.internal->_type == "page" && link.internal->isIndexPage == true => "/",
        defined(link.internal->slug.current) => "/" + link.internal->slug.current,
        defined(link.href) => link.href,
        true => null
      )
    }
  }`;
  try {
    return await withCache(cacheKey('navigation'), TTL_META_MS, async () =>
      fetchPublished(query)
    );
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
    return await withCache(cacheKey('designTokens'), TTL_META_MS, async () =>
      fetchPublished(query)
    );
  } catch {
    return { light: null, dark: null };
  }
}

export async function getHomepage(): Promise<any | null> {
  const query = `*[_type == "page" && isIndexPage == true][0]{
    _id,
    _type,
    title,
    description,
    slug,
    mainImage${IMAGE_PROJECTION},
    body${PORTABLE_TEXT_PROJECTION},
    sections${SECTION_PROJECTION}
  }`;
  try {
    return await withCache(cacheKey('homepage'), TTL_PAGE_MS, async () =>
      fetchPublished(query)
    );
  } catch {
    return null;
  }
}

export async function getPageBySlug(slug: string): Promise<any | null> {
  const resolvedSlug = cleanSlug(slug);
  const query = `*[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    description,
    slug,
    mainImage${IMAGE_PROJECTION},
    body${PORTABLE_TEXT_PROJECTION},
    sections${SECTION_PROJECTION}
  }`;
  try {
    return await withCache(cacheKey('pageBySlug', resolvedSlug), TTL_PAGE_MS, async () =>
      fetchPublished(query, { slug: resolvedSlug })
    );
  } catch {
    return null;
  }
}

export async function getProjects(options: {
  limit?: number;
  featuredOnly?: boolean;
  category?: string;
} = {}): Promise<any[]> {
  const query = `*[
    _type in ["project", "portfolioProject"]
    && defined(slug.current)
    && ($featuredOnly == false || featured == true)
    && ($category == "" || category == $category || $category in categories[]->slug.current)
  ] | order(coalesce(order, 9999) asc, coalesce(year, 0) desc, coalesce(publishedAt, _updatedAt) desc)
  [0...$limit]{
    _id,
    _type,
    title,
    excerpt,
    slug,
    "cover": coalesce(cover, mainImage)${IMAGE_PROJECTION},
    "tags": coalesce(tags[]->title, tags[]),
    "category": coalesce(category, categories[0]->title, portfolioType),
    year,
    featured,
    technologies,
    "externalUrl": coalesce(liveUrl, url)
  }`;

  const fetchParams = {
    limit: options.limit ?? 24,
    featuredOnly: options.featuredOnly ?? false,
    category: options.category ?? ''
  };

  try {
    const projects = await withCache(cacheKey('projects', fetchParams), TTL_PAGE_MS, async () =>
      fetchPublished(query, fetchParams)
    );
    return projects ?? [];
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<any | null> {
  const resolvedSlug = cleanSlug(slug);
  const query = `*[
    _type in ["project", "portfolioProject"]
    && slug.current == $slug
  ][0]{
    _id,
    _type,
    title,
    excerpt,
    slug,
    "cover": coalesce(cover, mainImage)${IMAGE_PROJECTION},
    "gallery": coalesce(gallery, [])[]{..., asset->{url, metadata{dimensions}}},
    "tags": coalesce(tags[]->title, tags[]),
    "category": coalesce(category, categories[0]->title, portfolioType),
    "categories": coalesce(categories[]->title, []),
    year,
    technologies,
    roles,
    collaborators,
    client,
    goals,
    "externalUrl": coalesce(liveUrl, url),
    githubUrl,
    liveUrl,
    projectDate,
    body${PORTABLE_TEXT_PROJECTION},
    introduction${PORTABLE_TEXT_PROJECTION},
    challenge${PORTABLE_TEXT_PROJECTION},
    resultTitle,
    resultDescription${PORTABLE_TEXT_PROJECTION},
    caseStudySections[]{
      title,
      description,
      imageA{alt, asset->{url, metadata{dimensions}}},
      imageB{alt, asset->{url, metadata{dimensions}}}
    }
  }`;
  try {
    return await withCache(cacheKey('projectBySlug', resolvedSlug), TTL_PAGE_MS, async () =>
      fetchPublished(query, { slug: resolvedSlug })
    );
  } catch {
    return null;
  }
}

export async function getPosts(options: { limit?: number; featuredOnly?: boolean } = {}): Promise<any[]> {
  const query = `*[
    _type in ["post", "blogPost"]
    && defined(slug.current)
    && ($featuredOnly == false || featured == true)
  ] | order(coalesce(publishedAt, _updatedAt) desc)
  [0...$limit]{
    _id,
    _type,
    title,
    excerpt,
    slug,
    "cover": coalesce(cover, mainImage)${IMAGE_PROJECTION},
    publishedAt,
    "authorName": author->name,
    "categories": coalesce(categories[]->title, []),
    "tags": coalesce(tags[]->title, tags[]),
    featured
  }`;

  const fetchParams = { limit: options.limit ?? 24, featuredOnly: options.featuredOnly ?? false };
  try {
    const posts = await withCache(cacheKey('posts', fetchParams), TTL_PAGE_MS, async () =>
      fetchPublished(query, fetchParams)
    );
    return posts ?? [];
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<any | null> {
  const resolvedSlug = cleanSlug(slug);
  const query = `*[
    _type in ["post", "blogPost"]
    && slug.current == $slug
  ][0]{
    _id,
    _type,
    title,
    excerpt,
    slug,
    "cover": coalesce(cover, mainImage)${IMAGE_PROJECTION},
    publishedAt,
    updatedAt,
    "authorName": author->name,
    "categories": coalesce(categories[]->title, []),
    "tags": coalesce(tags[]->title, tags[]),
    seo,
    body${PORTABLE_TEXT_PROJECTION}
  }`;
  try {
    return await withCache(cacheKey('postBySlug', resolvedSlug), TTL_PAGE_MS, async () =>
      fetchPublished(query, { slug: resolvedSlug })
    );
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
    return await withCache(cacheKey('errorPages'), TTL_META_MS, async () =>
      fetchPublished(query)
    );
  } catch {
    return { notFound: null, generic: null };
  }
}
