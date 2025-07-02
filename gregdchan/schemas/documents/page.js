// documents/page.js
export default {
    name: 'page',
    title: 'Pages',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        description: 'The URL path of this page',
        options: {
          source: 'title',
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'mainImage',
        title: 'Main Image',
        type: 'mainImage',
        description: 'The primary image displayed at the top of the page'
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text',
        description: 'A short description of the page content',
        rows: 3
      },
      {
        name: 'content',
        title: 'Page Content',
        type: 'blockContent',
      },
      {
        name: 'sections',
        title: 'Page Sections',
        description: 'Add modular content sections to your page',
        type: 'array',
        of: [
          { type: 'blockContent' },
          { type: 'mainImage' },
          { type: 'gallery' },
          { type: 'testimonial' },
          { type: 'callToAction' },
          { type: 'embed' }
        ]
      },
      {
        name: 'seo',
        title: 'SEO & Social',
        type: 'seo'
      }
    ],
    preview: {
      select: {
        title: 'title',
        media: 'mainImage'
      },
      prepare({ title, media }) {
        return {
          title,
          subtitle: 'Page',
          media
        };
      }
    }
  };
  