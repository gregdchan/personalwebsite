import designToken from './documents/designToken'

// Documents
import navigation from './documents/navigation'
import blogPost from './documents/blogPost'
import caseStudy from './documents/caseStudy'
import category from './documents/category'
import portfolioProject from './documents/portfolioProject'
import tag from './documents/tag'
import author from './documents/author'
import page from './documents/page' 

// Objects
import blockContent from './objects/blockContent'
import callToAction from './objects/callToAction'
import code from './objects/code'
import embed from './objects/embed'
import gallery from './objects/gallery'
import link from './objects/link'
import mainImage from './objects/mainImage'
import seo from './objects/seo'
import testimonial from './objects/testimonial'
import hero from './objects/hero'
import parallaxSection from './objects/parallaxSection'
import threeJsSection from './objects/threeJsSection'
import pictureHero from './objects/pictureHero'

// Resume/CV schemas
import education from './objects/education'
import skills from './objects/skills'
import experience from './objects/experience'

// Content section schemas
import videoHero from './objects/videoHero'
import richText from './objects/richText'
import testimonialCarousel from './objects/testimonialCarousel'
import faq from './objects/faq'
import featureGrid from './objects/featureGrid'
import imageCarousel from './objects/imageCarousel'

const validateSchema = (schema) => {
  console.log(`Validating schema: ${schema.name}`)
  return schema
}

export default [
  // Documents
  validateSchema(page),
  validateSchema(blogPost),
  validateSchema(tag),
  validateSchema(author),
  validateSchema(designToken),
  validateSchema(navigation),
  validateSchema(caseStudy),
  validateSchema(category),
  validateSchema(portfolioProject),
  
  // Objects
  validateSchema(blockContent),
  validateSchema(code),
  validateSchema(mainImage),
  validateSchema(seo),
  validateSchema(link),
  validateSchema(hero),
  validateSchema(pictureHero),
  validateSchema(testimonial),
  
  // Resume/CV schemas
  validateSchema(education),
  validateSchema(skills),
  validateSchema(experience),
  
  // Content section schemas
  validateSchema(videoHero),
  validateSchema(richText),
  validateSchema(testimonialCarousel),
  validateSchema(faq),
  validateSchema(featureGrid),
  validateSchema(imageCarousel),
  
  // Additional objects
  validateSchema(callToAction),
  validateSchema(embed),
  validateSchema(gallery),
  validateSchema(parallaxSection),
  validateSchema(threeJsSection)
]
