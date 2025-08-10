import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'frame',
  title: 'Embedded Frame',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'height',
      title: 'Height (px)',
      type: 'number',
      initialValue: 400,
    }),
  ],
})
