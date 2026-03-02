import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'projectPalette',
  title: 'Project Palette',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Palette Title', type: 'string' }),
    defineField({ name: 'description', title: 'Design Rationale', type: 'text', rows: 3 }),
    defineField({
      name: 'swatches',
      title: 'Color Swatches',
      type: 'array',
      of: [{ type: 'projectColorSwatch' }],
      validation: (Rule) => Rule.max(12)
    })
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Color Palette' }
    }
  }
})
