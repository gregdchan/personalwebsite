import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'errorPage',
  title: 'Error Page',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Type',
      type: 'string',
      options: { list: ['generic', 'notFound'] },
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'message', title: 'Message', type: 'text' }),
    defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'CTA Href', type: 'string' })
  ]
});