import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'parallaxSection',
  title: 'Parallax Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'layers',
      title: 'Parallax Layers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Layer Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'depth',
              title: 'Depth Factor',
              description: 'How fast this layer moves (0.1 = slow, 1.0 = fast)',
              type: 'number',
              initialValue: 0.5,
              validation: Rule => Rule.min(0).max(1),
            }),
            defineField({
              name: 'offsetX',
              title: 'Horizontal Offset (%)',
              type: 'number',
              initialValue: 0,
            }),
            defineField({
              name: 'offsetY',
              title: 'Vertical Offset (%)',
              type: 'number',
              initialValue: 0,
            }),
          ]
        }
      ]
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'height',
      title: 'Section Height (vh)',
      description: 'Height in viewport height units',
      type: 'number',
      initialValue: 70,
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'layers.0.image',
    },
    prepare({title, media}) {
      return {
        title: title || 'Parallax Section',
        subtitle: 'Parallax',
        media,
      }
    },
  },
})