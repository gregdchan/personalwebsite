/**
 * WordPress → Sanity CMS Migration Script
 *
 * Migrates published content from a WordPress WXR export into Sanity:
 *   - Categories & Tags → category / tag documents
 *   - Author → author document
 *   - Blog posts → blogPost documents
 *   - Projects → project documents (with ACF case-study fields)
 *   - Attachments → Sanity image assets
 */

import fs from 'node:fs';
import path from 'node:path';
import { parseStringPromise } from 'xml2js';
import { createClient } from '@sanity/client';
import fetch from 'node-fetch';
import { parseDocument } from 'htmlparser2';
import { textContent, getChildren, getName, getAttributeValue } from 'domutils';

// ─── Configuration ──────────────────────────────────────────────────────────
const WP_XML_PATH = path.resolve(
  process.env.WP_XML_PATH ||
    '/home/gdc/Downloads/gregdchandesigntechnologist.WordPress.2026-03-02.xml'
);

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'smxz6rsz';
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
const SANITY_TOKEN = process.env.SANITY_TOKEN; // must be a write-token

if (!SANITY_TOKEN) {
  console.error('ERROR: Set SANITY_TOKEN env var to a Sanity write token.');
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Unwrap CDATA helper – xml2js already does this, but just in case */
function cdata(val) {
  if (Array.isArray(val)) return val[0] || '';
  return val || '';
}

function slug(text) {
  return (text || '')
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Generate a stable Sanity document _id from a type prefix + WP id */
function sanityId(prefix, wpId) {
  return `wp-${prefix}-${wpId}`;
}

/** Small delay to avoid hammering servers */
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Get meta value by key from a WP item's postmeta array */
function getMeta(item, key) {
  const metas = item['wp:postmeta'] || [];
  for (const m of metas) {
    if (cdata(m['wp:meta_key']) === key) {
      return cdata(m['wp:meta_value']);
    }
  }
  return '';
}

/** Parse a serialized PHP array of image IDs like a:9:{i:0;s:3:"588";...} */
function parsePhpArray(str) {
  if (!str) return [];
  const ids = [];
  const re = /s:\d+:"(\d+)"/g;
  let match;
  while ((match = re.exec(str)) !== null) {
    ids.push(match[1]);
  }
  return ids;
}

// ─── HTML → Portable Text Converter ────────────────────────────────────────

/**
 * Converts an HTML string to Sanity Portable Text blocks.
 * Handles: p, h1-h6, blockquote, ul/ol, a, strong, em, code, img, br
 */
function htmlToPortableText(html, assetMap) {
  if (!html || !html.trim()) return [];

  // Strip WordPress block comments
  const cleaned = html
    .replace(/<!--\s*\/?wp:[^>]*-->/g, '')
    .replace(/<!--.*?-->/gs, '')
    .trim();

  if (!cleaned) return [];

  const doc = parseDocument(cleaned, { decodeEntities: true });
  const blocks = [];
  let blockKeyCounter = 0;

  function nextKey() {
    return `k${++blockKeyCounter}`;
  }

  function processNode(node) {
    if (node.type === 'text') return;
    const tag = getName(node);
    const children = getChildren(node) || [];

    if (['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'].includes(tag)) {
      const styleMap = {
        p: 'normal',
        h1: 'h2',
        h2: 'h2',
        h3: 'h3',
        h4: 'h3',
        h5: 'h3',
        h6: 'h3',
        blockquote: 'blockquote',
      };
      const { spans, markDefs } = extractSpans(children);
      if (spans.length === 0) return;
      blocks.push({
        _type: 'block',
        _key: nextKey(),
        style: styleMap[tag] || 'normal',
        markDefs,
        children: spans,
      });
    } else if (tag === 'ul' || tag === 'ol') {
      const listType = tag === 'ul' ? 'bullet' : 'number';
      for (const li of children) {
        if (getName(li) === 'li') {
          const { spans, markDefs } = extractSpans(getChildren(li) || []);
          if (spans.length === 0) continue;
          blocks.push({
            _type: 'block',
            _key: nextKey(),
            style: 'normal',
            listItem: listType,
            level: 1,
            markDefs,
            children: spans,
          });
        }
      }
    } else if (tag === 'img') {
      const src = getAttributeValue(node, 'src') || '';
      const alt = getAttributeValue(node, 'alt') || '';
      // Try to find asset in our map
      const assetRef = findAssetRef(src, assetMap);
      if (assetRef) {
        blocks.push({
          _type: 'image',
          _key: nextKey(),
          asset: { _type: 'reference', _ref: assetRef },
          alt,
        });
      }
    } else if (tag === 'figure') {
      // Recurse into figure to find img
      for (const child of children) {
        processNode(child);
      }
    } else if (tag === 'div' || tag === 'section' || tag === 'article' || tag === 'main') {
      for (const child of children) {
        processNode(child);
      }
    } else if (tag === 'br') {
      // ignore standalone br
    } else {
      // Fallback: treat as a paragraph
      const { spans, markDefs } = extractSpans([node]);
      if (spans.length > 0) {
        blocks.push({
          _type: 'block',
          _key: nextKey(),
          style: 'normal',
          markDefs,
          children: spans,
        });
      }
    }
  }

  function extractSpans(nodes) {
    const spans = [];
    const markDefs = [];
    let spanKeyCounter = 0;

    function walk(nodeList, marks = []) {
      for (const node of nodeList) {
        if (node.type === 'text') {
          const text = node.data;
          if (text) {
            spans.push({
              _type: 'span',
              _key: `s${++spanKeyCounter}`,
              text,
              marks: [...marks],
            });
          }
        } else if (node.type === 'tag') {
          const tag = getName(node);
          const childNodes = getChildren(node) || [];

          if (tag === 'strong' || tag === 'b') {
            walk(childNodes, [...marks, 'strong']);
          } else if (tag === 'em' || tag === 'i') {
            walk(childNodes, [...marks, 'em']);
          } else if (tag === 'code') {
            walk(childNodes, [...marks, 'code']);
          } else if (tag === 'a') {
            const href = getAttributeValue(node, 'href') || '';
            const markKey = `link${++spanKeyCounter}`;
            markDefs.push({
              _type: 'link',
              _key: markKey,
              href,
            });
            walk(childNodes, [...marks, markKey]);
          } else if (tag === 'br') {
            spans.push({
              _type: 'span',
              _key: `s${++spanKeyCounter}`,
              text: '\n',
              marks: [],
            });
          } else if (tag === 'img') {
            // Skip inline images in span context
          } else {
            walk(childNodes, marks);
          }
        }
      }
    }

    walk(nodes);
    return { spans, markDefs };
  }

  const rootChildren = getChildren(doc) || [];
  for (const node of rootChildren) {
    processNode(node);
  }

  // If nothing was parsed but there's text, create a simple paragraph
  if (blocks.length === 0 && cleaned.length > 0) {
    const plainText = cleaned.replace(/<[^>]+>/g, '').trim();
    if (plainText) {
      blocks.push({
        _type: 'block',
        _key: nextKey(),
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 's1', text: plainText, marks: [] }],
      });
    }
  }

  return blocks;
}

/** Try to find a Sanity asset reference for a WP image URL */
function findAssetRef(url, assetMap) {
  if (!url || !assetMap) return null;
  // Exact URL match
  for (const [, info] of assetMap) {
    if (info.url === url && info.sanityAssetId) {
      return info.sanityAssetId;
    }
  }
  // Filename match
  const filename = url.split('/').pop()?.split('?')[0];
  if (filename) {
    for (const [, info] of assetMap) {
      if (info.url.endsWith(filename) && info.sanityAssetId) {
        return info.sanityAssetId;
      }
    }
  }
  return null;
}

/** Convert plain text (with newlines) to simple portable text */
function textToPortableText(text) {
  if (!text || !text.trim()) return [];
  const paragraphs = text.split(/\n\n+/);
  return paragraphs.map((p, i) => ({
    _type: 'block',
    _key: `p${i}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `s${i}`, text: p.replace(/\n/g, ' ').trim(), marks: [] }],
  })).filter(b => b.children[0].text);
}

// ─── Parse WordPress XML ────────────────────────────────────────────────────

async function parseWpXml() {
  console.log(`Reading WordPress XML from: ${WP_XML_PATH}`);
  const xml = fs.readFileSync(WP_XML_PATH, 'utf-8');
  const result = await parseStringPromise(xml, {
    explicitArray: true,
    tagNameProcessors: [(name) => name],
  });
  return result;
}

// ─── Main Migration ─────────────────────────────────────────────────────────

async function main() {
  const data = await parseWpXml();
  const channel = data.rss.channel[0];
  const items = channel.item || [];

  console.log(`Total items in XML: ${items.length}`);

  // ── Classify items by type & status ──
  const attachments = [];
  const posts = [];
  const projects = [];
  const pages = [];

  for (const item of items) {
    const postType = cdata(item['wp:post_type']);
    const status = cdata(item['wp:status']);

    if (postType === 'attachment') {
      attachments.push(item);
    } else if (postType === 'post' && status === 'publish') {
      posts.push(item);
    } else if (postType === 'project' && status === 'publish') {
      projects.push(item);
    } else if (postType === 'page' && status === 'publish') {
      pages.push(item);
    }
  }

  console.log(`Attachments: ${attachments.length}`);
  console.log(`Published posts: ${posts.length}`);
  console.log(`Published projects: ${projects.length}`);
  console.log(`Published pages: ${pages.length}`);

  // ── Build attachment URL map ──
  // Map: wp_post_id → { url, title, alt }
  const attachmentMap = new Map();
  for (const att of attachments) {
    const wpId = cdata(att['wp:post_id']);
    const url = cdata(att['wp:attachment_url']);
    const title = cdata(att.title);
    const altMeta = getMeta(att, '_wp_attachment_image_alt');
    attachmentMap.set(wpId, { url, title, alt: altMeta || title, sanityAssetId: null });
  }
  console.log(`Attachment map built: ${attachmentMap.size} entries`);

  // ── Collect all referenced attachment IDs ──
  const referencedAttachmentIds = new Set();

  // From posts (thumbnail)
  for (const item of [...posts, ...projects, ...pages]) {
    const thumbId = getMeta(item, '_thumbnail_id');
    if (thumbId) referencedAttachmentIds.add(thumbId);
  }

  // From project ACF fields (image fields store attachment IDs)
  const projectImageFields = [
    'result_1_image', 'result_1_image_a', 'result_1_image_b', 'result_1_image_copy',
    'result_1_image_b_copy', 'input_one_image_a', 'input_one_image_b', 'input_one_image_c',
    'input_2_image_a', 'input_2_image_b', 'results_one_image_a', 'results_two_image_b',
    'results_three_image_c',
  ];
  for (const proj of projects) {
    for (const field of projectImageFields) {
      const val = getMeta(proj, field);
      if (val && /^\d+$/.test(val)) referencedAttachmentIds.add(val);
    }
    // Gallery
    const galleryStr = getMeta(proj, 'project_gallery');
    if (galleryStr) {
      for (const id of parsePhpArray(galleryStr)) {
        referencedAttachmentIds.add(id);
      }
    }
  }

  // Also parse content for image references
  for (const item of [...posts, ...projects, ...pages]) {
    const content = cdata(item['content:encoded']);
    // Find image IDs in gallery shortcodes like ids="982,981,980"
    const idsMatches = content.matchAll(/ids="([^"]+)"/g);
    for (const m of idsMatches) {
      for (const id of m[1].split(',')) {
        if (/^\d+$/.test(id.trim())) referencedAttachmentIds.add(id.trim());
      }
    }
  }

  console.log(`Referenced attachments to upload: ${referencedAttachmentIds.size}`);

  // ── Upload images to Sanity ──
  console.log('\n--- Uploading images to Sanity ---');
  let uploadCount = 0;
  let uploadErrors = 0;

  for (const wpId of referencedAttachmentIds) {
    const att = attachmentMap.get(wpId);
    if (!att) {
      console.warn(`  Attachment ${wpId} not found in map, skipping`);
      continue;
    }
    if (att.sanityAssetId) continue; // already uploaded

    try {
      const url = att.url;
      console.log(`  Uploading [${++uploadCount}/${referencedAttachmentIds.size}]: ${url.split('/').pop()}`);

      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`    HTTP ${response.status} for ${url}, skipping`);
        uploadErrors++;
        continue;
      }

      const contentType = response.headers.get('content-type') || 'image/jpeg';
      const buffer = Buffer.from(await response.arrayBuffer());
      const filename = url.split('/').pop() || 'image.jpg';

      const asset = await client.assets.upload('image', buffer, {
        filename,
        contentType,
      });

      att.sanityAssetId = asset._id;
      console.log(`    → ${asset._id}`);

      await sleep(200); // throttle
    } catch (err) {
      console.error(`    Error uploading ${att.url}: ${err.message}`);
      uploadErrors++;
    }
  }

  console.log(`\nUploaded: ${uploadCount - uploadErrors} images, ${uploadErrors} errors`);

  // ── Extract WP categories & tags ──
  const wpCategories = channel['wp:category'] || [];
  const wpTerms = channel['wp:term'] || [];

  // ── Create category documents ──
  console.log('\n--- Creating categories ---');
  const categoryIdMap = new Map(); // nicename → sanity _id

  // Blog categories
  for (const cat of wpCategories) {
    const name = cdata(cat['wp:cat_name']);
    const nicename = cdata(cat['wp:category_nicename']);
    const termId = cdata(cat['wp:term_id']);
    const docId = sanityId('cat', termId);
    categoryIdMap.set(nicename, docId);

    await client.createOrReplace({
      _id: docId,
      _type: 'category',
      title: name,
      slug: { _type: 'slug', current: nicename },
    });
    console.log(`  Category: ${name} (${docId})`);
  }

  // Project categories (from wp:term with taxonomy=project_category)
  for (const term of wpTerms) {
    const taxonomy = cdata(term['wp:term_taxonomy']);
    if (taxonomy === 'project_category') {
      const name = cdata(term['wp:term_name']);
      const termSlug = cdata(term['wp:term_slug']);
      const termId = cdata(term['wp:term_id']);
      const docId = sanityId('cat', termId);
      categoryIdMap.set(termSlug, docId);

      await client.createOrReplace({
        _id: docId,
        _type: 'category',
        title: name,
        slug: { _type: 'slug', current: termSlug },
      });
      console.log(`  Project Category: ${name} (${docId})`);
    }
  }

  // ── Create tag documents ──
  console.log('\n--- Creating tags ---');
  const tagIdMap = new Map(); // nicename → sanity _id

  // Project tags (from wp:term with taxonomy=project_tag)
  for (const term of wpTerms) {
    const taxonomy = cdata(term['wp:term_taxonomy']);
    if (taxonomy === 'project_tag') {
      const name = cdata(term['wp:term_name']);
      const termSlug = cdata(term['wp:term_slug']);
      const termId = cdata(term['wp:term_id']);
      const docId = sanityId('tag', termId);
      tagIdMap.set(termSlug, docId);

      await client.createOrReplace({
        _id: docId,
        _type: 'tag',
        title: name,
        slug: { _type: 'slug', current: termSlug },
      });
      console.log(`  Tag: ${name} (${docId})`);
    }
  }

  // ── Create author document ──
  console.log('\n--- Creating author ---');
  const authorId = 'wp-author-1';
  await client.createOrReplace({
    _id: authorId,
    _type: 'author',
    name: 'Greg D. Chan',
    slug: { _type: 'slug', current: 'greg-d-chan' },
    role: 'Design Technologist',
    email: 'gregdchan@gmail.com',
  });
  console.log(`  Author: Greg D. Chan (${authorId})`);

  // ── Create blog post documents ──
  console.log('\n--- Creating blog posts ---');
  for (const item of posts) {
    const wpId = cdata(item['wp:post_id']);
    const title = cdata(item.title);
    const postSlug = cdata(item['wp:post_name']) || slug(title);
    const content = cdata(item['content:encoded']);
    const excerpt = cdata(item['excerpt:encoded']);
    const pubDate = cdata(item['wp:post_date']);
    const thumbId = getMeta(item, '_thumbnail_id');

    // Convert content to Portable Text
    const body = htmlToPortableText(content, attachmentMap);

    // Build category references
    const categoryRefs = [];
    const itemCats = item.category || [];
    for (const cat of itemCats) {
      const domain = cat.$.domain;
      const nicename = cat.$.nicename;
      if (domain === 'category' && categoryIdMap.has(nicename)) {
        categoryRefs.push({
          _type: 'reference',
          _ref: categoryIdMap.get(nicename),
          _key: `catref-${nicename}`,
        });
      }
    }

    // Build main image
    let mainImage = undefined;
    if (thumbId && attachmentMap.has(thumbId)) {
      const att = attachmentMap.get(thumbId);
      if (att.sanityAssetId) {
        mainImage = {
          _type: 'image',
          asset: { _type: 'reference', _ref: att.sanityAssetId },
          alt: att.alt || title,
        };
      }
    }

    const docId = sanityId('post', wpId);
    const doc = {
      _id: docId,
      _type: 'blogPost',
      title,
      slug: { _type: 'slug', current: postSlug },
      excerpt: excerpt || undefined,
      body: body.length > 0 ? body : undefined,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : undefined,
      author: { _type: 'reference', _ref: authorId },
      categories: categoryRefs.length > 0 ? categoryRefs : undefined,
      mainImage,
    };

    // Remove undefined fields
    Object.keys(doc).forEach((k) => doc[k] === undefined && delete doc[k]);

    await client.createOrReplace(doc);
    console.log(`  Post: ${title} (${docId})`);
  }

  // ── Create project documents ──
  console.log('\n--- Creating projects ---');
  for (const item of projects) {
    const wpId = cdata(item['wp:post_id']);
    const title = cdata(item.title);
    const postSlug = cdata(item['wp:post_name']) || slug(title);
    const content = cdata(item['content:encoded']);
    const excerpt = cdata(item['excerpt:encoded']);
    const pubDate = cdata(item['wp:post_date']);
    const thumbId = getMeta(item, '_thumbnail_id');

    // ACF fields
    const portfolioType = getMeta(item, 'Portfolio Type');
    const clientDetails = getMeta(item, 'client_details');
    const goalsDetails = getMeta(item, 'goals_details');
    const roleDetails = getMeta(item, 'role_details');
    const introductionHtml = getMeta(item, 'introduction');
    const challengeHtml = getMeta(item, 'challenge');
    const collaboratorsStr = getMeta(item, 'collaborators');
    const resultsTitle = getMeta(item, 'results_title');
    const resultsDescHtml = getMeta(item, 'results_description');

    // Parse collaborators (newline-separated)
    const collaborators = collaboratorsStr
      ? collaboratorsStr.split('\n').map((s) => s.trim()).filter(Boolean)
      : [];

    // Parse roles (newline-separated)
    const roles = roleDetails
      ? roleDetails.split('\n').map((s) => s.trim()).filter(Boolean)
      : [];

    // Convert rich text fields to Portable Text
    const introduction = introductionHtml
      ? htmlToPortableText(introductionHtml, attachmentMap)
      : textToPortableText(introductionHtml);
    const challenge = challengeHtml
      ? htmlToPortableText(challengeHtml, attachmentMap)
      : textToPortableText(challengeHtml);
    const resultDescription = resultsDescHtml
      ? htmlToPortableText(resultsDescHtml, attachmentMap)
      : [];
    const body = htmlToPortableText(content, attachmentMap);

    // Build cover image
    let cover = undefined;
    if (thumbId && attachmentMap.has(thumbId)) {
      const att = attachmentMap.get(thumbId);
      if (att.sanityAssetId) {
        cover = {
          _type: 'imageWithAlt',
          asset: { _type: 'reference', _ref: att.sanityAssetId },
          alt: att.alt || title,
        };
      }
    }

    // Build gallery from project_gallery ACF field
    const galleryStr = getMeta(item, 'project_gallery');
    const galleryIds = parsePhpArray(galleryStr);
    const gallery = [];
    for (const gId of galleryIds) {
      const att = attachmentMap.get(gId);
      if (att?.sanityAssetId) {
        gallery.push({
          _type: 'image',
          _key: `gal-${gId}`,
          asset: { _type: 'reference', _ref: att.sanityAssetId },
          alt: att.alt || '',
        });
      }
    }

    // Build case study sections from ACF input_one/two/three fields
    const caseStudySections = [];
    const sectionConfigs = [
      { titleKey: 'input_one_title', descKey: 'input_one_description', imgAKey: 'input_one_image_a', imgBKey: 'input_one_image_b' },
      { titleKey: 'input_two_title', descKey: 'input_two_description', imgAKey: 'input_2_image_a', imgBKey: 'input_2_image_b' },
      { titleKey: 'input_3_title', descKey: 'input_3_description', imgAKey: null, imgBKey: null },
      { titleKey: 'input_three_title', descKey: 'input_three_description', imgAKey: null, imgBKey: null },
    ];

    for (const cfg of sectionConfigs) {
      const sTitle = getMeta(item, cfg.titleKey);
      const sDesc = getMeta(item, cfg.descKey);
      if (!sTitle && !sDesc) continue;

      const section = {
        _type: 'caseStudySection',
        _key: `cs-${slug(cfg.titleKey)}`,
        title: sTitle || undefined,
        description: sDesc || undefined,
      };

      if (cfg.imgAKey) {
        const imgAId = getMeta(item, cfg.imgAKey);
        if (imgAId && attachmentMap.has(imgAId)) {
          const att = attachmentMap.get(imgAId);
          if (att.sanityAssetId) {
            section.imageA = {
              _type: 'image',
              asset: { _type: 'reference', _ref: att.sanityAssetId },
            };
          }
        }
      }
      if (cfg.imgBKey) {
        const imgBId = getMeta(item, cfg.imgBKey);
        if (imgBId && attachmentMap.has(imgBId)) {
          const att = attachmentMap.get(imgBId);
          if (att.sanityAssetId) {
            section.imageB = {
              _type: 'image',
              asset: { _type: 'reference', _ref: att.sanityAssetId },
            };
          }
        }
      }

      caseStudySections.push(section);
    }

    // Get project categories and tags
    const itemCats = item.category || [];
    const projectTags = [];
    for (const cat of itemCats) {
      const domain = cat.$.domain;
      const nicename = cat.$.nicename;
      if (domain === 'project_category' && categoryIdMap.has(nicename)) {
        // Use as category string
      }
      if (domain === 'project_tag') {
        projectTags.push(nicename);
      }
    }

    // Determine category for Sanity (use first project_category)
    let sanityCategory = undefined;
    for (const cat of itemCats) {
      if (cat.$.domain === 'project_category') {
        const catName = cat._ || '';
        // Map WP project categories to Sanity category values
        const catMap = {
          'Virtual Reality': '3d',
          'Digital Media': 'web',
          'Print Media': 'design',
          'Application': 'web',
          'HCI': 'ai',
          'Website': 'web',
        };
        sanityCategory = catMap[catName] || 'web';
        break;
      }
    }

    const docId = sanityId('project', wpId);
    const doc = {
      _id: docId,
      _type: 'project',
      title,
      slug: { _type: 'slug', current: postSlug === wpId ? slug(title) : postSlug },
      excerpt: excerpt || undefined,
      cover,
      category: sanityCategory,
      tags: projectTags.length > 0 ? projectTags : undefined,
      body: body.length > 0 ? body : undefined,
      year: pubDate ? new Date(pubDate).getFullYear() : undefined,
      projectDate: pubDate ? pubDate.split(' ')[0] : undefined,

      // ACF case study fields
      client: clientDetails || undefined,
      collaborators: collaborators.length > 0 ? collaborators : undefined,
      roles: roles.length > 0 ? roles : undefined,
      portfolioType: portfolioType || undefined,
      goals: goalsDetails || undefined,
      introduction: introduction.length > 0 ? introduction : undefined,
      challenge: challenge.length > 0 ? challenge : undefined,
      resultTitle: resultsTitle || undefined,
      resultDescription: resultDescription.length > 0 ? resultDescription : undefined,
      gallery: gallery.length > 0 ? gallery : undefined,
      caseStudySections: caseStudySections.length > 0 ? caseStudySections : undefined,
    };

    // Remove undefined fields
    Object.keys(doc).forEach((k) => doc[k] === undefined && delete doc[k]);

    await client.createOrReplace(doc);
    console.log(`  Project: ${title} (${docId}) [${portfolioType}]`);
  }

  // ── Summary ──
  console.log('\n=== Migration Complete ===');
  console.log(`  Categories: ${categoryIdMap.size}`);
  console.log(`  Tags: ${tagIdMap.size}`);
  console.log(`  Blog Posts: ${posts.length}`);
  console.log(`  Projects: ${projects.length}`);
  console.log(`  Images uploaded: ${uploadCount - uploadErrors}`);
  console.log(`  Image errors: ${uploadErrors}`);
  console.log('\nAll documents created as drafts. Use Sanity MCP publish_documents to publish them.');
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
