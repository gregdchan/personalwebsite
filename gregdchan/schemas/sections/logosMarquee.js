import { defineField, defineType, defineArrayMember } from 'sanity';

export default defineType({
  name: 'logosMarquee',
  title: 'Logos Marquee',
  type: 'object',
  fields: [
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'image', title: 'Image', type: 'imageWithAlt', validation: (Rule) => Rule.required() }),
            defineField({ name: 'url', title: 'Link (optional)', type: 'url' })
          ],
          preview: { select: { title: 'image.alt', media: 'image' } }
        })
      ],
      options: { layout: 'grid' }
    })
  ],
  preview: {
    select: { count: 'logos.length' },
    prepare({ count }) {
      return { title: `Logos (${count || 0})` }
    }
  }
});