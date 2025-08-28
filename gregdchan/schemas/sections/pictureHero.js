import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'pictureHero',
  title: 'Picture Hero',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 3 }),
    defineField({ name: 'hoverZoom', title: 'Hover Zoom (scale)', type: 'number', initialValue: 1.1 }),
    defineField({ name: 'backgroundImage', title: 'Image', type: 'imageWithAlt', validation: (Rule) => Rule.required() })
  ],
  preview: { select: { title: 'heading', media: 'backgroundImage' } }
});