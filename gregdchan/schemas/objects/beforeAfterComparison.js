import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'beforeAfterComparison',
  title: 'Before / After Comparison',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'context', title: 'Context', type: 'text', rows: 2, description: 'What changed and why' }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: { list: [{ title: 'Side by Side', value: 'side-by-side' }, { title: 'Stacked', value: 'stacked' }] },
      initialValue: 'side-by-side'
    }),
    defineField({
      name: 'before',
      title: 'Before Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'after',
      title: 'After Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Before / After' }
    }
  }
})
