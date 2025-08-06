import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Text', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'href',  title: 'URL',  type: 'url',    validation: Rule => Rule.uri({ scheme: ['http','https'] }) }),
    defineField({ name: 'blank', title: 'New tab', type: 'boolean' })
  ]
});
