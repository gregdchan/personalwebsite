import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'animationSettings',
  title: 'Animation Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'animationType',
      title: 'Animation Type',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Fade In', value: 'fadeIn'},
          {title: 'Slide Up', value: 'slideUp'},
          {title: 'Slide From Left', value: 'slideLeft'},
          {title: 'Slide From Right', value: 'slideRight'},
          {title: 'Scale Up', value: 'scaleUp'},
          {title: 'Custom', value: 'custom'},
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'customAnimation',
      title: 'Custom Animation',
      description: 'Enter CSS keyframes or Framer Motion config as JSON',
      type: 'text',
      hidden: ({parent}) => parent?.animationType !== 'custom',
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
      initialValue: 0.5,
      hidden: ({parent}) => parent?.animationType === 'none',
    }),
    defineField({
      name: 'delay',
      title: 'Delay (seconds)',
      type: 'number',
      initialValue: 0,
      hidden: ({parent}) => parent?.animationType === 'none',
    }),
    defineField({
      name: 'easing',
      title: 'Easing',
      type: 'string',
      options: {
        list: [
          {title: 'Linear', value: 'linear'},
          {title: 'Ease', value: 'ease'},
          {title: 'Ease In', value: 'easeIn'},
          {title: 'Ease Out', value: 'easeOut'},
          {title: 'Ease In Out', value: 'easeInOut'},
        ],
      },
      initialValue: 'easeOut',
      hidden: ({parent}) => parent?.animationType === 'none',
    }),
    defineField({
      name: 'triggerOnScroll',
      title: 'Trigger on Scroll',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.animationType === 'none',
    }),
  ],
})