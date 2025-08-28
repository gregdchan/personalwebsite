import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'videoHero',
  title: 'Video Hero',
  type: 'object',
  fields: [
    defineField({ name: 'overlayText', title: 'Overlay Text', type: 'string' }),
    defineField({ name: 'backgroundVideo', title: 'Video URL', type: 'url', validation: (Rule) => Rule.required() }),
    defineField({ name: 'posterImage', title: 'Poster Image', type: 'imageWithAlt' })
  ],
  preview: { select: { title: 'overlayText', media: 'posterImage' } }
});