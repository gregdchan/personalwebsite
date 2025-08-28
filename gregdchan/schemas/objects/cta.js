import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({ name: 'text', title: 'Text', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'url', title: 'URL', type: 'url', validation: (Rule) => Rule.required() }),
    defineField({ name: 'blank', title: 'Open in new tab', type: 'boolean', initialValue: false })
  ],
  preview: { select: { title: 'text', subtitle: 'url' } }
});