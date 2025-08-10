import {defineType, defineField, defineArrayMember} from 'sanity';

// =======================
// -- Reusable Block Types
// =======================

// Link Object
const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Link Text', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'href', title: 'URL', type: 'url', validation: Rule => Rule.uri({ scheme: ['http', 'https'] }) }),
    defineField({ name: 'blank', title: 'Open in new tab', type: 'boolean', initialValue: false })
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' }
  }
});

// Hero Section
const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({ name: 'preTitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })]
    }),
    defineField({ name: 'subtitle', title: 'Secondary Text', type: 'string' }),
    defineField({
      name: 'actions',
      title: 'CTA Buttons',
      type: 'array',
      of: [defineArrayMember({ type: 'link' })],
      options: { layout: 'tags' }
    }),
    defineField({ name: 'enableParallax', title: 'Enable Parallax', type: 'boolean', initialValue: true })
  ],
  preview: { select: { title: 'title', media: 'backgroundImage' } }
});

// Interactive Picture Hero
const pictureHero = defineType({
  name: 'pictureHero',
  title: 'Interactive Picture Hero',
  type: 'object',
  fields: [
    ...hero.fields,
    defineField({ name: 'hoverZoom', title: 'Hover Zoom', type: 'number', initialValue: 1.1 }),
    defineField({ name: 'animationSpeed', title: 'Parallax Speed', type: 'number', initialValue: 0.2 })
  ],
  preview: { select: { title: 'title', media: 'backgroundImage' } }
});

// Video Hero
const videoHero = defineType({
  name: 'videoHero',
  title: 'Video Hero',
  type: 'object',
  fields: [
    defineField({ name: 'videoUrl', title: 'Video URL', type: 'url', validation: Rule => Rule.uri({ scheme: ['http', 'https'] }) }),
    defineField({ name: 'posterImage', title: 'Poster Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'autoplay', title: 'Autoplay', type: 'boolean', initialValue: true }),
    defineField({ name: 'loop', title: 'Loop Video', type: 'boolean', initialValue: true }),
    defineField({ name: 'mute', title: 'Mute Audio', type: 'boolean', initialValue: true }),
    defineField({ name: 'overlayText', title: 'Overlay Text', type: 'string' })
  ],
  preview: { select: { title: 'overlayText', media: 'posterImage' } }
});

// Rich Text Block
const richText = defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }]
        })
      ]
    })
  ]
});

// Feature Grid
const featureGrid = defineType({
  name: 'featureGrid',
  title: 'Feature Grid',
  type: 'object',
  fields: [
    defineField({ name: 'columns', title: 'Columns', type: 'number', initialValue: 3, validation: Rule => Rule.min(1).max(4) }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'icon', title: 'Icon', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'text', title: 'Text', type: 'text' })
          ],
          preview: { select: { title: 'title', media: 'icon' } }
        })
      ],
      options: { layout: 'grid' }
    })
  ]
});

// Image Carousel
const imageCarousel = defineType({
  name: 'imageCarousel',
  title: 'Image Carousel',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
      options: { layout: 'grid' }
    }),
    defineField({ name: 'autoplay', title: 'Autoplay', type: 'boolean', initialValue: false }),
    defineField({ name: 'interval', title: 'Interval (ms)', type: 'number', initialValue: 5000 })
  ]
});

// Testimonial Carousel
const testimonialCarousel = defineType({
  name: 'testimonialCarousel',
  title: 'Testimonial Carousel',
  type: 'object',
  fields: [
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'quote', title: 'Quote', type: 'text' }),
            defineField({ name: 'author', title: 'Author', type: 'string' }),
            defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } })
          ],
          preview: { select: { title: 'author', media: 'photo' } }
        })
      ],
      options: { layout: 'grid' }
    }),
    defineField({ name: 'autoplay', title: 'Autoplay', type: 'boolean', initialValue: true }),
    defineField({ name: 'interval', title: 'Interval (ms)', type: 'number', initialValue: 7000 })
  ]
});

// FAQ Block
const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string' }),
            defineField({ name: 'answer', title: 'Answer', type: 'text' })
          ],
          preview: { select: { title: 'question' } }
        })
      ]
    })
  ]
});

// =======================
// -- Resume/CV Block Types
// =======================

// Education Block
const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'object',
  fields: [
    defineField({ 
      name: 'heading', 
      title: 'Institution', 
      type: 'string', 
      validation: Rule => Rule.required() 
    }),
    defineField({ 
      name: 'subheading', 
      title: 'Degree & Year', 
      type: 'string' 
    }),
    defineField({ 
      name: 'description', 
      title: 'Description', 
      type: 'text' 
    }),
    defineField({ 
      name: 'startDate', 
      title: 'Start Date', 
      type: 'date', 
      options: { dateFormat: 'YYYY-MM-DD' } 
    }),
    defineField({ 
      name: 'endDate', 
      title: 'End Date', 
      type: 'date', 
      options: { dateFormat: 'YYYY-MM-DD' } 
    }),
    defineField({
      name: 'logo',
      title: 'Institution Logo',
      type: 'image',
      options: { hotspot: true }
    })
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading'
    }
  }
});

// Skills Block
const skills = defineType({
  name: 'skills',
  title: 'Skills',
  type: 'object',
  fields: [
    defineField({ 
      name: 'heading', 
      title: 'Skill Category', 
      type: 'string', 
      validation: Rule => Rule.required() 
    }),
    defineField({ 
      name: 'subheading', 
      title: 'Skills Summary', 
      type: 'string' 
    }),
    defineField({ 
      name: 'skillsList', 
      title: 'Skills List', 
      type: 'array', 
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ 
              name: 'skill', 
              title: 'Skill', 
              type: 'string' 
            }),
            defineField({ 
              name: 'proficiency', 
              title: 'Proficiency', 
              type: 'number', 
              description: 'Rate from 1-100', 
              validation: Rule => Rule.min(1).max(100) 
            })
          ],
          preview: {
            select: {
              title: 'skill',
              subtitle: 'proficiency'
            },
            prepare({title, subtitle}) {
              return {
                title: title,
                subtitle: `Proficiency: ${subtitle}%`
              }
            }
          }
        })
      ],
      options: { layout: 'tags' }
    })
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading'
    }
  }
});

// Experience Block
const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'object',
  fields: [
    defineField({ 
      name: 'heading', 
      title: 'Company/Organization', 
      type: 'string', 
      validation: Rule => Rule.required() 
    }),
    defineField({ 
      name: 'subheading', 
      title: 'Position & Duration', 
      type: 'string' 
    }),
    defineField({ 
      name: 'description', 
      title: 'Description', 
      type: 'array', 
      of: [defineArrayMember({ type: 'block' })]
    }),
    defineField({ 
      name: 'startDate', 
      title: 'Start Date', 
      type: 'date', 
      options: { dateFormat: 'YYYY-MM-DD' } 
    }),
    defineField({ 
      name: 'endDate', 
      title: 'End Date', 
      type: 'date', 
      options: { dateFormat: 'YYYY-MM-DD' } 
    }),
    defineField({ 
      name: 'current', 
      title: 'Current Position', 
      type: 'boolean', 
      initialValue: false 
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: { hotspot: true }
    })
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
      media: 'companyLogo'
    }
  }
});

// =================
// -- Page Document
// =================

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO & Metadata' }
  ],
  fields: [
    // Shared
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required(), group: ['content', 'seo'] }),
    defineField({ name: 'description', title: 'Description', type: 'text', options: { rows: 3 }, group: ['content', 'seo'] }),

    // Content
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required(), group: 'content' }),
    defineField({ name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true }, group: 'content', fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })] }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent', group: 'content' }),
    defineField({ name: 'isIndexPage', title: 'Homepage?', type: 'boolean', initialValue: false, group: 'content' }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({ type: 'hero' }),
        defineArrayMember({ type: 'pictureHero' }),
        defineArrayMember({ type: 'videoHero' }),
        defineArrayMember({ type: 'richText' }),
        defineArrayMember({ type: 'featureGrid' }),
        defineArrayMember({ type: 'imageCarousel' }),
        defineArrayMember({ type: 'testimonialCarousel' }),
        defineArrayMember({ type: 'faq' }),
        defineArrayMember({ type: 'threeJsSection' }),
        defineArrayMember({ type: 'frame' }),
        // New resume/CV section types
        defineArrayMember({ type: 'education' }),
        defineArrayMember({ type: 'skills' }),
        defineArrayMember({ type: 'experience' })
      ],
      options: { sortable: true, editModal: 'fullscreen' },
      group: 'content'
    }),

    // SEO
    defineField({ name: 'seo', title: 'SEO Settings', type: 'seo', group: 'seo' })
  ],
  preview: { select: { title: 'title', subtitle: 'description', media: 'mainImage' } }
});
