
// objects/gallery.js
export default {
    name: 'gallery',
    title: 'Gallery',
    type: 'object',
    fields: [
      {
        name: 'title',
        title: 'Gallery Title',
        type: 'string'
      },
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [
          {
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
              }
            ]
          }
        ],
        options: {
          layout: 'grid'
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'display',
        title: 'Display as',
        type: 'string',
        options: {
          list: [
            {title: 'Grid', value: 'grid'},
            {title: 'Carousel', value: 'carousel'},
            {title: 'Slideshow', value: 'slideshow'}
          ],
          layout: 'radio'
        },
        initialValue: 'grid'
      }
    ],
    preview: {
      select: {
        title: 'title',
        images: 'images'
      },
      prepare({title, images}) {
        return {
          title: title || 'Gallery',
          subtitle: images ? `${images.length} image${images.length !== 1 ? 's' : ''}` : 'No images',
          media: images && images[0]
        };
      }
    }
  };