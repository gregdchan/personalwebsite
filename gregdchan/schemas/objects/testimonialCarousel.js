import {defineType, defineField, defineArrayMember} from 'sanity';

export default defineType({
  name: 'testimonialCarousel',
  title: 'Testimonial Carousel',
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
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [defineArrayMember({ type: 'testimonial' })],
      validation: Rule => Rule.required().min(1)
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
      name: 'pauseOnHover',
      title: 'Pause on Hover',
      type: 'boolean',
      initialValue: true,
      hidden: ({parent}) => !parent?.autoplay
    }),
    defineField({
      name: 'showDots',
      title: 'Show Navigation Dots',
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
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'Use design token variable or color code'
    })
  ],
  preview: {
    select: {
      title: 'title',
      testimonialCount: 'testimonials.length'
    },
    prepare({title, testimonialCount = 0}) {
      return {
        title: title || 'Testimonial Carousel',
        subtitle: `${testimonialCount} testimonial${testimonialCount !== 1 ? 's' : ''}`
      };
    }
  }
});