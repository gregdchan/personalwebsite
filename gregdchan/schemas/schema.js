// schema.js

// Documents
import blogPost from './documents/blogPost';
import caseStudy from './documents/caseStudy';
import category from './documents/category';
import navigation from './documents/navigation';
import page from './documents/page';
import portfolioProject from './documents/portfolioProject';
import tag from './documents/tag';
import author from './documents/author';

// Objects
import blockContent from './objects/blockContent';
import callToAction from './objects/callToAction';
import code from './objects/code';
import embed from './objects/embed';
import gallery from './objects/gallery';
import link from './objects/link';
import mainImage from './objects/mainImage';
import seo from './objects/seo';
import testimonial from './objects/testimonial';

// Design Tokens
import designToken from './designToken';

export const schemaTypes = [
  // documents
  blogPost,
  caseStudy,
  category,
  navigation,
  page,
  portfolioProject,
  tag,
  author,

  // objects
  blockContent,
  callToAction,
  code,
  embed,
  gallery,
  link,
  mainImage,
  seo,
  testimonial,

  // design tokens
  designToken
];
