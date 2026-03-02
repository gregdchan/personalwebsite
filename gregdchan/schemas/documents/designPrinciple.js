import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'designPrinciple',
  title: 'Design Principle',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: 'icon', title: 'Icon', type: 'string', description: 'Icon name (e.g. "layers", "zap", "compass")' }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Visual Design', value: 'visual' },
          { title: 'Interaction', value: 'interaction' },
          { title: 'Accessibility', value: 'accessibility' },
          { title: 'Performance', value: 'performance' },
          { title: 'Content', value: 'content' },
          { title: 'System', value: 'system' }
        ]
      }
    })
  ],
  preview: {
    select: { title: 'title', category: 'category' },
    prepare({ title, category }) {
      return { title, subtitle: category || 'Uncategorized' }
    }
  }
})
