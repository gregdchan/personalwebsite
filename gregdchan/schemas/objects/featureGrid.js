import {defineType, defineField, defineArrayMember} from 'sanity';

export default defineType({
  name: 'featureGrid',
  title: 'Feature Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string'
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text'
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text'
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: { hotspot: true }
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link'
            })
          ],
          preview: {
            select: {
              title: 'title',
              media: 'icon'
            }
          }
        })
      ],
      validation: Rule => Rule.min(1)
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [
          {title: '1 Column', value: 1},
          {title: '2 Columns', value: 2},
          {title: '3 Columns', value: 3},
          {title: '4 Columns', value: 4}
        ]
      },
      initialValue: 3
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Use design token variable or color code'
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'Use design token variable or color code'
    })
  ],
  preview: {
    select: {
      title: 'title',
      featureCount: 'features.length'
    },
    prepare({title, featureCount = 0}) {
      return {
        title: title || 'Feature Grid',
        subtitle: `${featureCount} feature${featureCount !== 1 ? 's' : ''}`
      };
    }
  }
});