import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO & Metadata',
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: ['content', 'seo']
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL path of this page (e.g. /about)',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule) => Rule.required(),
      group: 'content'
    }),
    defineField({
      name: 'mainImage',
      title: 'Featured Image',
      type: 'mainImage',
      group: 'content'
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 3,
      group: ['content', 'seo'],
      description: 'A brief description of this page (used for SEO and previews)'
    }),
    defineField({
      name: 'body',
      title: 'Main Content',
      type: 'blockContent',
      group: 'content'
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social',
      type: 'seo',
      group: 'seo'
    }),
    defineField({
      name: 'isIndexPage',
      title: 'Is Homepage?',
      type: 'boolean',
      description: 'Set this page as the site homepage',
      initialValue: false,
      group: 'content'
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      description: 'Add modular content sections to build your page',
      type: 'array',
      group: 'content',
      of: [
        { type: 'hero' }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'mainImage'
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle || '(No description)',
        media
      }
    }
  }
});
