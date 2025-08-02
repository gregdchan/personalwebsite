import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Gallery Title',
      type: 'string'
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'mainImage' }]
    })
  ]
})