import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'cover', title: 'Cover Image', type: 'imageWithAlt' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      description: 'Technologies used (shown as coin slots on arcade cabinet)',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Project category for filtering',
      options: {
        list: [
          { title: 'Web Development', value: 'web' },
          { title: '3D/WebGL', value: '3d' },
          { title: 'AI/ML', value: 'ai' },
          { title: 'Data Visualization', value: 'viz' },
          { title: 'Design Systems', value: 'design' }
        ]
      }
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first'
    }),
    defineField({ name: 'url', title: 'External URL', type: 'url' }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      description: 'Link to GitHub repository'
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Demo URL',
      type: 'url',
      description: 'Link to live project demo'
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'Year project was completed'
    }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent' })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'cover',
      category: 'category'
    },
    prepare({ title, media, category }) {
      return {
        title,
        subtitle: category || 'Uncategorized',
        media
      }
    }
  }
});