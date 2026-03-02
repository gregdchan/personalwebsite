import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'projectMetric',
  title: 'Project Metric',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'value', title: 'Value', type: 'string', description: 'e.g. "42%", "$1.2M", "3x"', validation: (Rule) => Rule.required() }),
    defineField({ name: 'delta', title: 'Delta', type: 'string', description: 'Change indicator, e.g. "+15%", "-2s"' }),
    defineField({ name: 'context', title: 'Context', type: 'string', description: 'Brief explanation of the metric' }),
    defineField({ name: 'highlight', title: 'Highlight', type: 'boolean', description: 'Show as a large hero stat', initialValue: false })
  ],
  preview: {
    select: { label: 'label', value: 'value' },
    prepare({ label, value }) {
      return { title: `${label}: ${value}` }
    }
  }
})
