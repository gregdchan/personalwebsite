import {defineType, defineField, defineArrayMember} from 'sanity';

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'object',
  fields: [
    defineField({ 
      name: 'heading', 
      title: 'Company/Organization', 
      type: 'string', 
      validation: Rule => Rule.required() 
    }),
    defineField({ 
      name: 'subheading', 
      title: 'Position & Duration', 
      type: 'string' 
    }),
    defineField({ 
      name: 'description', 
      title: 'Description', 
      type: 'array', 
      of: [defineArrayMember({ type: 'block' })]
    }),
    defineField({ 
      name: 'startDate', 
      title: 'Start Date', 
      type: 'date', 
      options: { dateFormat: 'YYYY-MM-DD' } 
    }),
    defineField({ 
      name: 'endDate', 
      title: 'End Date', 
      type: 'date', 
      options: { dateFormat: 'YYYY-MM-DD' } 
    }),
    defineField({ 
      name: 'current', 
      title: 'Current Position', 
      type: 'boolean', 
      initialValue: false 
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: { hotspot: true }
    })
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
      media: 'companyLogo'
    }
  }
});