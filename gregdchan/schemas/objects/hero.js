import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'backgroundType',
      title: 'Background Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
          {title: 'Animation', value: 'animation'},
          {title: 'Solid Color', value: 'color'},
          {title: 'Gradient', value: 'gradient'},
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      hidden: ({parent}) => parent?.backgroundType !== 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video URL',
      type: 'url',
      hidden: ({parent}) => parent?.backgroundType !== 'video',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      hidden: ({parent}) => !['color', 'gradient'].includes(parent?.backgroundType),
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Secondary Color (for gradient)',
      type: 'color',
      hidden: ({parent}) => parent?.backgroundType !== 'gradient',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {name: 'text', title: 'Button Text', type: 'string'},
        {name: 'url', title: 'URL', type: 'url'},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage',
    },
    prepare({title, media}) {
      return {
        title: title || 'Hero Section',
        subtitle: 'Hero',
        media,
      }
    },
  },
})