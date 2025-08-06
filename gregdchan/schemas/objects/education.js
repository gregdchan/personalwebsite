import {defineType, defineField, defineArrayMember} from 'sanity';

export default defineType({
  name: 'education',
  title: 'Education',
  type: 'object',
  fields: [
    defineField({ 
      name: 'heading', 
      title: 'Institution', 
      type: 'string', 
      validation: Rule => Rule.required() 
    }),
    defineField({ 
      name: 'subheading', 
      title: 'Degree & Year', 
      type: 'string' 
    }),
    defineField({ 
      name: 'description', 
      title: 'Description', 
      type: 'text' 
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
      name: 'logo',
      title: 'Institution Logo',
      type: 'image',
      options: { hotspot: true }
    })
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading'
    }
  }
});