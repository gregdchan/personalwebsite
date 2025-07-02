// documents/portfolioProject.js
export default {
    name: 'portfolioProject',
    title: 'Portfolio Projects',
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
        description: 'The URL path of this project',
        options: {
          source: 'title',
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'projectType',
        title: 'Project Type',
        type: 'string',
        options: {
          list: [
            { title: 'Visual Portfolio', value: 'visual' },
            { title: 'Case Study', value: 'caseStudy' }
          ],
          layout: 'radio'
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'mainImage',
        title: 'Main Image',
        type: 'mainImage',
        description: 'Featured image for the project'
      },
      {
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'category' } }]
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'tag' } }],
        options: {
          layout: 'tags'
        }
      },
      {
        name: 'client',
        title: 'Client',
        type: 'string'
      },
      {
        name: 'completedAt',
        title: 'Completed At',
        type: 'date',
        options: {
          dateFormat: 'YYYY-MM-DD'
        }
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text',
        description: 'A short description of the project',
        rows: 3
      },
      {
        name: 'gallery',
        title: 'Project Gallery',
        type: 'gallery',
        description: 'Image gallery for this project'
      },
      {
        name: 'content',
        title: 'Project Description',
        type: 'blockContent',
      },
      {
        name: 'externalLink',
        title: 'External Link',
        type: 'url',
        description: 'Link to live project if available'
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
        subtitle: 'projectType',
        media: 'mainImage'
      },
      prepare({ title, subtitle, media }) {
        const subtitleText = subtitle === 'visual' ? 'Visual Portfolio' : 'Case Study';
        return {
          title,
          subtitle: subtitleText,
          media
        };
      }
    }
  };