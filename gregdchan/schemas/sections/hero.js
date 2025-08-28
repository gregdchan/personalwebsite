import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 3 }),
    defineField({ name: 'actions', title: 'Actions', type: 'array', of: [{ type: 'cta' }] }),
    defineField({ name: 'backgroundImage', title: 'Background Image', type: 'imageWithAlt' }),
    defineField({ name: 'posterImage', title: 'Poster (for video)', type: 'imageWithAlt' }),
    defineField({ name: 'backgroundVideo', title: 'Background Video URL', type: 'url' }),
    defineField({ name: 'backgroundColor', title: 'Background Color', type: 'color' }),
    defineField({ name: 'secondaryColor', title: 'Secondary Color (for gradients)', type: 'color' })
  ],
  preview: { select: { title: 'heading', media: 'backgroundImage' } }
});