import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'infographicBlock',
  title: 'Infographic Block',
  type: 'object',
  fields: [
    defineField({
      name: 'blockType',
      title: 'Block Type',
      type: 'string',
      options: {
        list: [
          { title: 'Stat Highlight', value: 'stat' },
          { title: 'Bar Chart', value: 'bar' },
          { title: 'Donut Chart', value: 'donut' },
          { title: 'Flow Diagram', value: 'flow' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'caption', title: 'Caption', type: 'text', rows: 2 }),

    // Stat fields
    defineField({
      name: 'statValue',
      title: 'Stat Value',
      type: 'string',
      hidden: ({ parent }) => parent?.blockType !== 'stat'
    }),
    defineField({
      name: 'statLabel',
      title: 'Stat Label',
      type: 'string',
      hidden: ({ parent }) => parent?.blockType !== 'stat'
    }),

    // Chart data (bar + donut)
    defineField({
      name: 'chartData',
      title: 'Chart Data',
      type: 'array',
      hidden: ({ parent }) => !['bar', 'donut'].includes(parent?.blockType),
      of: [{
        type: 'object',
        name: 'chartDataPoint',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'value', title: 'Value', type: 'number' }),
          defineField({ name: 'color', title: 'Color (hex)', type: 'string' })
        ],
        preview: {
          select: { label: 'label', value: 'value' },
          prepare({ label, value }) {
            return { title: `${label}: ${value}` }
          }
        }
      }]
    }),

    // Flow diagram
    defineField({
      name: 'flowSteps',
      title: 'Flow Steps',
      type: 'array',
      hidden: ({ parent }) => parent?.blockType !== 'flow',
      of: [{
        type: 'object',
        name: 'flowStep',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'string' })
        ],
        preview: {
          select: { title: 'label' }
        }
      }]
    })
  ],
  preview: {
    select: { blockType: 'blockType', title: 'title' },
    prepare({ blockType, title }) {
      const typeLabels = { stat: 'Stat', bar: 'Bar Chart', donut: 'Donut Chart', flow: 'Flow Diagram' }
      return { title: title || typeLabels[blockType] || 'Infographic' }
    }
  }
})
