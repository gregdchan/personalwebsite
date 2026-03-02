import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'projectColorSwatch',
  title: 'Color Swatch',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'color', title: 'Color', type: 'color', options: { disableAlpha: true } }),
    defineField({ name: 'usage', title: 'Usage Note', type: 'string', description: 'Where this color is used (e.g. "Primary CTA", "Background")' })
  ],
  preview: {
    select: { title: 'label' },
    prepare({ title }) {
      return { title: title || 'Unnamed swatch' }
    }
  }
})
