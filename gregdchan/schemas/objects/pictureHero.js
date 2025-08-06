import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'pictureHero',
  title: 'Interactive Picture Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'preTitle',
      title: 'Subtitle (Pre-Title)',
      type: 'string'
    }),
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required()
        })
      ]
    }),
    defineField({
      name: 'subtitle',
      title: 'Secondary Text',
      type: 'string'
    }),
    defineField({
      name: 'actions',
      title: 'CTA Buttons',
      type: 'array',
      of: [defineArrayMember({ type: 'link' })],
      options: { layout: 'tags' }
    }),
    defineField({
      name: 'parallax',
      title: 'Enable Parallax',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'hoverZoom',
      title: 'Hover Zoom (e.g. 1.1)',
      type: 'number',
      initialValue: 1.1
    }),
    defineField({
      name: 'animationSpeed',
      title: 'Parallax Speed',
      type: 'number',
      initialValue: 0.2
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'backgroundImage'
    }
  }
})
