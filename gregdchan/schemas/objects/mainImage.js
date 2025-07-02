// objects/mainImage.js
export default {
    name: 'mainImage',
    title: 'Image',
    type: 'image',
    options: {
      hotspot: true
    },
    fields: [
      {
        name: 'alt',
        title: 'Alternative Text',
        type: 'string',
        description: 'Important for SEO and accessibility',
        validation: Rule => Rule.required()
      },
      {
        name: 'caption',
        title: 'Caption',
        type: 'string'
      },
      {
        name: 'attribution',
        title: 'Attribution',
        type: 'string'
      }
    ],
    preview: {
      select: {
        imageUrl: 'asset.url',
        title: 'caption'
      }
    }
  };