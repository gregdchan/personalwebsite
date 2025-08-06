import {defineType, defineField, defineArrayMember} from 'sanity';

export default defineType({
  name: 'skills',
  title: 'Skills',
  type: 'object',
  fields: [
    defineField({ 
      name: 'heading', 
      title: 'Skill Category', 
      type: 'string', 
      validation: Rule => Rule.required() 
    }),
    defineField({ 
      name: 'subheading', 
      title: 'Skills Summary', 
      type: 'string' 
    }),
    defineField({ 
      name: 'skillsList', 
      title: 'Skills List', 
      type: 'array', 
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ 
              name: 'skill', 
              title: 'Skill', 
              type: 'string' 
            }),
            defineField({ 
              name: 'proficiency', 
              title: 'Proficiency', 
              type: 'number', 
              description: 'Rate from 1-100', 
              validation: Rule => Rule.min(1).max(100) 
            })
          ],
          preview: {
            select: {
              title: 'skill',
              subtitle: 'proficiency'
            },
            prepare({title, subtitle}) {
              return {
                title: title,
                subtitle: `Proficiency: ${subtitle}%`
              }
            }
          }
        })
      ],
      options: { layout: 'tags' }
    })
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading'
    }
  }
});