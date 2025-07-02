import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [
        defineType({
          type: 'object',
          name: 'navItem',
          title: 'Navigation Item',
          fields: [
            defineField({
              name: 'text',
              type: 'string',
              title: 'Text',
              validation: (Rule) => Rule.required()
            }),
            // Use a "link" object for both internal & external
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
              validation: (Rule) => Rule.required()
            }),
            defineField({
              name: 'target',
              type: 'string',
              title: 'Target',
              initialValue: '_self',
              options: {
                list: [
                  { title: 'Same tab', value: '_self' },
                  { title: 'New tab',  value: '_blank' }
                ],
                layout: 'radio'
              }
            }),
            defineField({
              name: 'children',
              title: 'Sub-menu',
              type: 'array',
              of: [
                defineType({
                  type: 'object',
                  name: 'navChild',
                  title: 'Child Item',
                  fields: [
                    defineField({ name: 'text', type: 'string', title: 'Text', validation: Rule => Rule.required() }),
                    defineField({ name: 'link', type: 'link',  title: 'Link', validation: Rule => Rule.required() }),
                    defineField({
                      name: 'target',
                      type: 'string',
                      title: 'Target',
                      initialValue: '_self',
                      options: { list: [
                        { title: 'Same tab', value: '_self' },
                        { title: 'New tab',  value: '_blank' }
                      ], layout: 'radio' }
                    })
                  ],
                  preview: {
                    select: { title: 'text', subtitle: 'link.href' }
                  }
                })
              ]
            })
          ],
          preview: {
            select: { title: 'text', subtitle: 'link.href' }
          }
        })
      ]
    })
  ],
  preview: {
    select: { title: 'title' }
  }
})
