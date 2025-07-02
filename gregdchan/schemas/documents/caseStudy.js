// documents/caseStudy.js
export default {
    name: 'caseStudy',
    title: 'Case Studies',
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
        description: 'The URL path of this case study',
        options: {
          source: 'title',
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'mainImage',
        title: 'Main Image',
        type: 'mainImage',
        description: 'Featured image for the case study'
      },
      {
        name: 'client',
        title: 'Client',
        type: 'string'
      },
      {
        name: 'industry',
        title: 'Industry',
        type: 'string'
      },
      {
        name: 'projectDuration',
        title: 'Project Duration',
        type: 'string',
        description: 'e.g. "3 months", "Jan-Mar 2023"'
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
        name: 'overview',
        title: 'Project Overview',
        type: 'text',
        rows: 4
      },
      {
        name: 'challenge',
        title: 'The Challenge',
        type: 'blockContent',
        description: 'Describe the problem or challenge faced'
      },
      {
        name: 'approach',
        title: 'The Approach',
        type: 'blockContent',
        description: 'Explain your strategy and methodology'
      },
      {
        name: 'solution',
        title: 'The Solution',
        type: 'blockContent',
        description: 'Describe what was delivered'
      },
      {
        name: 'results',
        title: 'The Results',
        type: 'blockContent',
        description: 'Explain the outcomes and impact'
      },
      {
        name: 'gallery',
        title: 'Project Gallery',
        type: 'gallery',
      },
      {
        name: 'testimonials',
        title: 'Testimonials',
        type: 'array',
        of: [{ type: 'testimonial' }]
      },
      {
        name: 'relatedProjects',
        title: 'Related Projects',
        type: 'array',
        of: [
          { type: 'reference', to: [{ type: 'portfolioProject' }, { type: 'caseStudy' }] }
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
        client: 'client',
        media: 'mainImage'
      },
      prepare({ title, client, media }) {
        return {
          title,
          subtitle: client ? `Client: ${client}` : 'Case Study',
          media
        };
      }
    }
  };