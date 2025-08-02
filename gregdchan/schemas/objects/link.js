import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal', value: 'internal' },
          { title: 'External', value: 'external' }
        ],
        layout: 'radio'
      },
      initialValue: 'internal'
    }),
    defineField({
      name: 'internal',
      title: 'Internal Link',
      type: 'reference',
      to: [
        { type: 'page' },
        { type: 'blogPost' }
      ],
      hidden: ({ parent }) => parent?.linkType !== 'internal'
    }),
    defineField({
      name: 'external',
      title: 'External URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      })
    })
  ]
})
