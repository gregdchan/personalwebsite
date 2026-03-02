import designToken from './documents/designToken'
import gameConfig from './documents/gameConfig'

// Documents
import navigation from './documents/navigation'
import blogPost from './documents/blogPost'
import caseStudy from './documents/caseStudy'
import category from './documents/category'
import portfolioProject from './documents/portfolioProject'
import tag from './documents/tag'
import author from './documents/author'
import page from './documents/page'
import project from './documents/project'
import post from './documents/post'
import errorPage from './objects/errorPage'

// Objects
import blockContent from './objects/blockContent'
import callToAction from './objects/callToAction'
import embed from './objects/embed'
import gallery from './objects/gallery'
import link from './objects/link'
import mainImage from './objects/mainImage'
import seo from './objects/seo'
import hero from './objects/hero'
import parallaxSection from './objects/parallaxSection'
import threeJsSection from './objects/threeJsSection'
import frame from './objects/frame'
import pictureHero from './objects/pictureHero'
import imageWithAlt from './objects/imageWithAlt'
import cta from './objects/cta'

// Resume/CV schemas
import education from './objects/education'
import skills from './objects/skills'
import experience from './objects/experience'

// Content section schemas
import videoHero from './objects/videoHero'
import richText from './objects/richText'
import faq from './objects/faq'
import featureGrid from './objects/featureGrid'
import imageCarousel from './objects/imageCarousel'
import about from './sections/about'
import logosMarquee from './sections/logosMarquee'
import contactCta from './sections/contactCta'
import skillsCloud from './sections/skillsCloud' // NEW
import projectGrid from './objects/projectGrid'

const validateSchema = (schema) => {
  if (!schema) {
    console.error('[sanity] ERROR: A schema object is undefined. Check your imports in index.js');
    return { name: 'error', type: 'object', fields: [] };
  }
  if (!schema.name) {
    console.error('[sanity] ERROR: Schema is missing a name property:', schema);
    return { ...schema, name: 'unnamed_error' };
  }
  return schema
}

// Build the list
const all = [
  // Documents
  validateSchema(page),
  validateSchema(blogPost),
  validateSchema(tag),
  validateSchema(author),
  validateSchema(designToken),
  validateSchema(gameConfig),
  validateSchema(navigation),
  validateSchema(caseStudy),
  validateSchema(category),
  validateSchema(portfolioProject),
  validateSchema(project),
  validateSchema(post),
  validateSchema(errorPage),

  // Objects
  validateSchema(blockContent),
  validateSchema(mainImage),
  validateSchema(seo),
  validateSchema(link),
  validateSchema(hero),
  validateSchema(pictureHero),
  validateSchema(imageWithAlt),
  validateSchema(cta),

  // Resume/CV schemas
  validateSchema(education),
  validateSchema(skills),
  validateSchema(experience),

  // Content section schemas
  validateSchema(videoHero),
  validateSchema(richText),
  validateSchema(faq),
  validateSchema(featureGrid),
  validateSchema(imageCarousel),
  validateSchema(about),
  validateSchema(logosMarquee),
  validateSchema(contactCta),
  validateSchema(skillsCloud), // NEW
  validateSchema(projectGrid),

  // Additional objects
  validateSchema(callToAction),
  validateSchema(embed),
  validateSchema(gallery),
  validateSchema(parallaxSection),
  validateSchema(threeJsSection),
  validateSchema(frame)
]

// Deduplicate by schema.name and warn on collisions
const seen = new Set()
const types = all.filter((s) => {
  if (seen.has(s.name)) {
    console.warn(`[sanity] Duplicate schema name ignored: ${s.name}`)
    return false
  }
  seen.add(s.name)
  return true
})

export default types
