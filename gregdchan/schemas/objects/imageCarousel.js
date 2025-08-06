import {defineType, defineField, defineArrayMember} from 'sanity';

export default defineType({
  name: 'imageCarousel',
  title: 'Image Carousel',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string'
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'string'
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required(),
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Important for SEO and accessibility'
                })
              ]
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string'
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link'
            })
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image'
            },
            prepare({title, media}) {
              return {
                title: title || 'Image',
                media
              };
            }
          }
        })
      ],
      validation: Rule => Rule.min(1)
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'autoplaySpeed',
      title: 'Autoplay Speed (ms)',
      type: 'number',
      initialValue: 5000,
      hidden: ({parent}) => !parent?.autoplay
    }),
    defineField({
      name: 'infinite',
      title: 'Infinite Loop',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'showDots',
      title: 'Show Dots',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'showArrows',
      title: 'Show Navigation Arrows',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Use design token variable or color code'
    })
  ],
  preview: {
    select: {
      title: 'title',
      imageCount: 'images.length'
    },
    prepare({title, imageCount = 0}) {
      return {
        title: title || 'Image Carousel',
        subtitle: `${imageCount} image${imageCount !== 1 ? 's' : ''}`
      };
    }
  }
});