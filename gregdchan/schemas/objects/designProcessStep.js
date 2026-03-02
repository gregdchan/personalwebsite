import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'designProcessStep',
  title: 'Design Process Step',
  type: 'object',
  fields: [
    defineField({
      name: 'phase',
      title: 'Phase',
      type: 'string',
      options: {
        list: [
          { title: 'Discover', value: 'discover' },
          { title: 'Define', value: 'define' },
          { title: 'Ideate', value: 'ideate' },
          { title: 'Prototype', value: 'prototype' },
          { title: 'Test', value: 'test' },
          { title: 'Deliver', value: 'deliver' },
          { title: 'Custom', value: 'custom' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'customPhase',
      title: 'Custom Phase Name',
      type: 'string',
      hidden: ({ parent }) => parent?.phase !== 'custom'
    }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'methods',
      title: 'Methods & Tools',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })]
    })
  ],
  preview: {
    select: { phase: 'phase', customPhase: 'customPhase', summary: 'summary' },
    prepare({ phase, customPhase, summary }) {
      const label = phase === 'custom' ? (customPhase || 'Custom') : (phase || 'Step')
      return { title: label.charAt(0).toUpperCase() + label.slice(1), subtitle: summary }
    }
  }
})
