// objects/testimonial.js (continued)
export default {
    name: 'testimonial',
    title: 'Testimonial',
    type: 'object',
    fields: [
      {
        name: 'quote',
        title: 'Quote',
        type: 'text',
        rows: 3,
        validation: Rule => Rule.required()
      },
      {
        name: 'author',
        title: 'Author',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'role',
        title: 'Role/Position',
        type: 'string'
      },
      {
        name: 'company',
        title: 'Company',
        type: 'string'
      },
      {
        name: 'image',
        title: 'Author Image',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'rating',
        title: 'Rating',
        type: 'number',
        description: 'Rating from 1-5 stars',
        validation: Rule => Rule.min(1).max(5).precision(1)
      }
    ],
    preview: {
      select: {
        title: 'author',
        subtitle: 'company',
        media: 'image'
      },
      prepare({title, subtitle, media}) {
        return {
          title: title || 'Unnamed Author',
          subtitle: subtitle ? `From ${subtitle}` : 'Testimonial',
          media
        };
      }
    }
  };