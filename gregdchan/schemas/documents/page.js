import { defineType, defineField, defineArrayMember } from 'sanity';

// Sections are now imported globally in index.js





// =================
// -- Page Document
// =================

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'isIndexPage', title: 'Is Homepage', type: 'boolean', initialValue: false }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'mainImage'
    }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent' }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        // Heroes
        { type: 'hero' },
        { type: 'pictureHero' },
        { type: 'videoHero' },

        // Content
        { type: 'richText' },
        { type: 'featureGrid' },
        { type: 'imageCarousel' },
        { type: 'faq' },

        // Resume/CV
        { type: 'about' },
        { type: 'education' },
        { type: 'experience' },
        { type: 'skills' },
        { type: 'skillsCloud' },

        // Projects & Portfolio
        { type: 'projectGrid' },

        // Interactive & Advanced
        { type: 'threeJsSection' },
        { type: 'frame' },

        // Logos and CTA
        { type: 'logosMarquee' },
        { type: 'contactCta' }
      ],
      options: { sortable: true }
    })
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' }
  }
})
