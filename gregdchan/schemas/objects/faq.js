import {defineType, defineField, defineArrayMember} from 'sanity';

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Frequently Asked Questions'
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string'
    }),
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ 
              name: 'question', 
              title: 'Question', 
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({ 
              name: 'answer', 
              title: 'Answer', 
              type: 'blockContent',
              validation: Rule => Rule.required()
            })
          ],
          preview: { 
            select: { 
              title: 'question' 
            } 
          }
        })
      ],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Accordion', value: 'accordion'},
          {title: 'Tabs', value: 'tabs'},
          {title: 'Grid', value: 'grid'}
        ]
      },
      initialValue: 'accordion'
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Use design token variable or color code'
    })
  ],
  preview: {
    select: {
      title: 'title',
      itemCount: 'items.length'
    },
    prepare({title, itemCount = 0}) {
      return {
        title: title || 'FAQ Section',
        subtitle: `${itemCount} question${itemCount !== 1 ? 's' : ''}`
      };
    }
  }
});