import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'skillsCloud',
  title: 'Skills Cloud',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Skills' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'skillsList',
      title: 'Skills',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'skill', title: 'Skill', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({
              name: 'proficiency',
              title: 'Proficiency (%)',
              type: 'number',
              validation: (Rule) => Rule.min(0).max(100)
            })
          ],
          preview: {
            select: { title: 'skill', subtitle: 'proficiency' },
            prepare({ title, subtitle }) {
              return { title, subtitle: typeof subtitle === 'number' ? `${subtitle}%` : subtitle };
            }
          }
        })
      ],
      options: { layout: 'tags' }
    })
  ],
  preview: { select: { title: 'heading', subtitle: 'subheading' } }
});