import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'about',
  title: 'About',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'About me' }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent' }),
    defineField({ name: 'image', title: 'Image', type: 'imageWithAlt' })
  ],
  preview: { select: { title: 'heading', media: 'image' } }
});