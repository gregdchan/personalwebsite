import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'mainImage',
  title: 'Main Image',
  type: 'image',
  options: {
    hotspot: true
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Important for SEO and accessibility'
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string'
    })
  ]
})