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

const validateSchema = (schema) => {
  console.log(`Validating schema: ${schema.name}`)
  return schema
}

export default [
  // Documents
  // validateSchema(navigation),
  // validateSchema(blogPost),
  // validateSchema(caseStudy),
  // validateSchema(category),
  validateSchema(page),
  // validateSchema(portfolioProject),
  validateSchema(tag),
  validateSchema(author),
  validateSchema(designToken),
  
  // Objects
  validateSchema(blockContent),
  // validateSchema(callToAction),
  validateSchema(code),
  // validateSchema(embed),
  // validateSchema(gallery),
  //validateSchema(link),
  validateSchema(mainImage),
  validateSchema(seo),
  // validateSchema(testimonial),
  validateSchema(hero),
  // validateSchema(parallaxSection),
  // validateSchema(threeJsSection),

]
