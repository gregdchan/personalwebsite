// src/lib/utils/sanityImage.ts
import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';

// 1) initialize your Sanity client
const client = createClient({
  projectId: 'smxz6rsz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

// 2) create the image URL builder
const builder: ImageUrlBuilder = imageUrlBuilder(client);

/**
 * Core helper to build any image URL.
 * Usage: urlFor(source).width(300).height(200).format('webp').url()
 */
export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * Generate a 1× / 2× srcset for logos (default WebP @80% quality).
 *
 * @param source  — the Sanity image object
 * @param width   — the 1× width in px
 * @param quality — compression quality (1–100)
 * @param fmt     — output format (e.g. 'webp', 'png', 'jpg')
 *
 * @returns `"url-1x 1x, url-2x 2x"`
 */
export function logoSrcsetWebp(
  source: any,
  width = 120,
  quality = 80,
  fmt: 'webp' | 'png' | 'jpg' = 'webp'
) {
  if (!source?.asset?._ref) return '';

  const oneX = builder
    .image(source)
    .width(width)
    .format(fmt)
    .quality(quality)
    .url();

  const twoX = builder
    .image(source)
    .width(width * 2)
    .format(fmt)
    .quality(quality)
    .url();

  return `${oneX} 1x, ${twoX} 2x`;
}
