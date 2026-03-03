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
  perspective: 'published'
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * Returns an optimized Sanity image URL with specific dimensions and auto-format.
 */
export function optimizedUrl(source: any, width = 1200, quality = 80, height?: number) {
  if (!source) return '';
  try {
    let image = urlFor(source).width(width).auto('format').quality(quality);
    if (typeof height === 'number' && Number.isFinite(height) && height > 0) {
      // Height + fit(crop) allows Sanity to apply editor-defined crop/hotspot data.
      image = image.height(height).fit('crop');
    }
    return image.url();
  } catch (e) {
    return '';
  }
}

const cache = new Map<string, { expires: number; value: unknown }>();
const inflight = new Map<string, Promise<unknown>>();
const SANITY_TIMEOUT_MS = 5000;
const TTL_PAGE_MS = 5 * 60 * 1000;
const TTL_META_MS = 10 * 60 * 1000;

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

const IMAGE_PROJECTION = `{
  alt,
  asset->{url, metadata{dimensions, lqip}}
}`;

const TAGS_PROJECTION = `coalesce(
  array::compact(
    (coalesce(tags[]->title, [])) + (coalesce(tags[!defined(@->_ref)], []))
  ),
  []
)`;

const PORTABLE_TEXT_PROJECTION = `[]{
  ...,
  _type == "image" => { ..., asset->{url, metadata{dimensions, lqip}} },
  _type == "infographicBlock" => { ..., blockType, title, caption, statValue, statLabel, chartData[], flowSteps[] },
  markDefs[]{ ..., _type == "link" => { href, blank } }
}`;

const SECTION_PROJECTION = `[]{
  ...,
  image{alt, asset->{url, metadata{dimensions, lqip}}},
  backgroundImage{alt, asset->{url, metadata{dimensions, lqip}}},
  posterImage{alt, asset->{url, metadata{dimensions, lqip}}},
  mainImage{alt, asset->{url, metadata{dimensions, lqip}}},
  photo{alt, asset->{url, metadata{dimensions, lqip}}},
  logo{alt, asset->{url, metadata{dimensions, lqip}}},
  companyLogo{alt, asset->{url, metadata{dimensions, lqip}}},
  images[]{..., asset->{url, metadata{dimensions, lqip}}},
  testimonials[]{..., photo{alt, asset->{url, metadata{dimensions, lqip}}}},
  features[]{
    ...,
    image{alt, asset->{url, metadata{dimensions, lqip}}},
    icon{alt, asset->{url, metadata{dimensions, lqip}}}
  },
  logos[]{
    ...,
    logo{alt, asset->{url, metadata{dimensions, lqip}}}
  },
  items[]{
    ...,
    image{alt, asset->{url, metadata{dimensions, lqip}}},
    icon{alt, asset->{url, metadata{dimensions, lqip}}},
    photo{alt, asset->{url, metadata{dimensions, lqip}}}
  },
  _type == "projectGrid" => {
    ...,
    "items": *[_type == "project" && defined(slug.current)]
      | order(coalesce(order, 9999) asc, coalesce(year, 0) desc, coalesce(publishedAt, _updatedAt) desc)
      [0...24]{
      _id,
      _type,
      title,
      excerpt,
      slug,
      "cover": coalesce(cover, mainImage)${IMAGE_PROJECTION},
      "tags": ${TAGS_PROJECTION},
      "category": coalesce(category, categories[0]->title, portfolioType),
      year,
      featured
    }
  }
}`;

function cleanSlug(slug: string): string {
  return (slug || '').replace(/^\/+|\/+$/g, '');
}

function canonicalNavHref(href: unknown): string | null {
  if (typeof href !== 'string' || !href) return null;
  if (/^https?:\/\//i.test(href)) return href;

  const normalized = href.startsWith('/') ? href : `/${href}`;
  if (normalized === '/about-me') return '/about';
  return normalized;
}

function normalizeNavigation(nav: any): any {
  if (!nav || !Array.isArray(nav.items)) return nav;
  return {
    ...nav,
    items: nav.items.map((item: any) => {
      const canonicalHref = canonicalNavHref(item?.href);
      return canonicalHref ? { ...item, href: canonicalHref } : item;
    })
  };
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
        lower(text) == "about" || lower(text) == "about me" => "/about",
        lower(text) == "contact" => "/contact",
        link.linkType == "external" && defined(link.external) => link.external,
        defined(link.internal->_type) && link.internal->_type == "project" && defined(link.internal->slug.current) => "/work/" + link.internal->slug.current,
        defined(link.internal->_type) && link.internal->_type == "blogPost" && defined(link.internal->slug.current) => "/play/" + link.internal->slug.current,
        defined(link.internal->_type) && link.internal->_type == "page" && (link.internal->slug.current == "about" || link.internal->slug.current == "about-me") => "/about",
        defined(link.internal->_type) && link.internal->_type == "page" && link.internal->isIndexPage == true => "/",
        defined(link.href) && link.href == "/about-me" => "/about",
        defined(link.internal->slug.current) => "/" + link.internal->slug.current,
        defined(link.href) => link.href,
        true => null
      )
    }
  }`;
  try {
    const navigation = await withCache(cacheKey('navigation'), TTL_META_MS, async () =>
      fetchPublished(query)
    );
    return normalizeNavigation(navigation);
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
  tag?: string;
} = {}): Promise<any[]> {
  const requestedLimit = options.limit ?? 24;
  const query = `*[
    _type == "project"
    && defined(slug.current)
    && ($featuredOnly == false || featured == true)
    && ($category == "" || category == $category || $category in categories[]->slug.current)
    && (
      $tag == ""
      || $tag in coalesce(tags[]->title, [])
      || $tag in coalesce(tags[!defined(@->_ref)], [])
      || $tag in coalesce(tags[]->slug.current, [])
    )
  ] | order(coalesce(order, 9999) asc, coalesce(year, 0) desc, coalesce(publishedAt, _updatedAt) desc)
  [0...200]{
    _id,
    _type,
    title,
    excerpt,
    slug,
    "cover": coalesce(cover, mainImage)${IMAGE_PROJECTION},
    "tags": ${TAGS_PROJECTION},
    "category": coalesce(category, categories[0]->title, portfolioType),
    year,
    featured,
    technologies,
    "externalUrl": coalesce(liveUrl, url)
  }`;

  const fetchParams = {
    featuredOnly: options.featuredOnly ?? false,
    category: options.category ?? '',
    tag: options.tag ?? ''
  };

  try {
    const projects = await withCache(cacheKey('projects', fetchParams), TTL_PAGE_MS, async () =>
      fetchPublished(query, fetchParams)
    );
    return ((projects as any[]) ?? []).slice(0, requestedLimit);
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<any | null> {
  const resolvedSlug = cleanSlug(slug);
  const query = `*[
    _type == "project"
    && slug.current == $slug
  ][0]{
    _id,
    _type,
    title,
    excerpt,
    slug,
    "cover": coalesce(cover, mainImage)${IMAGE_PROJECTION},
    "gallery": coalesce(gallery, [])[]{..., asset->{url, metadata{dimensions, lqip}}},
    "tags": ${TAGS_PROJECTION},
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
      imageA{alt, asset->{url, metadata{dimensions, lqip}}},
      imageB{alt, asset->{url, metadata{dimensions, lqip}}}
    },
    palette{ title, description, swatches[]{ _key, label, color, usage } },
    designProcess[]{ _key, phase, customPhase, summary, methods, image{ alt, asset->{url, metadata{dimensions, lqip}} } },
    "designPrinciples": designPrinciples[]->{ _id, title, slug, icon, summary, category },
    beforeAfterComparisons[]{ _key, title, context, layout, before{ alt, asset->{url, metadata{dimensions, lqip}} }, after{ alt, asset->{url, metadata{dimensions, lqip}} } },
    metrics[]{ _key, label, value, delta, context, highlight },
    infographics[]{ _key, blockType, title, caption, statValue, statLabel, chartData[], flowSteps[] }
  }`;
  try {
    return await withCache(cacheKey('projectBySlug', resolvedSlug), TTL_PAGE_MS, async () =>
      fetchPublished(query, { slug: resolvedSlug })
    );
  } catch {
    return null;
  }
}

export async function getPosts(options: { limit?: number; featuredOnly?: boolean; tag?: string } = {}): Promise<any[]> {
  const requestedLimit = options.limit ?? 24;
  const query = `*[
    _type == "blogPost"
    && defined(slug.current)
    && ($featuredOnly == false || featured == true)
    && (
      $tag == ""
      || $tag in coalesce(tags[]->title, [])
      || $tag in coalesce(tags[!defined(@->_ref)], [])
      || $tag in coalesce(tags[]->slug.current, [])
    )
  ] | order(coalesce(publishedAt, _updatedAt) desc)
  [0...200]{
    _id,
    _type,
    title,
    excerpt,
    slug,
    "cover": coalesce(cover, mainImage)${IMAGE_PROJECTION},
    publishedAt,
    "authorName": author->name,
    "categories": coalesce(categories[]->title, []),
    "tags": ${TAGS_PROJECTION},
    featured
  }`;

  const fetchParams = {
    featuredOnly: options.featuredOnly ?? false,
    tag: options.tag ?? ''
  };
  try {
    const posts = await withCache(cacheKey('posts', fetchParams), TTL_PAGE_MS, async () =>
      fetchPublished(query, fetchParams)
    );
    return ((posts as any[]) ?? []).slice(0, requestedLimit);
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<any | null> {
  const resolvedSlug = cleanSlug(slug);
  const query = `*[
    _type == "blogPost"
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
    "tags": ${TAGS_PROJECTION},
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
