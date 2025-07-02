
// objects/callToAction.js
export default {
    name: 'callToAction',
    title: 'Call to Action',
    type: 'object',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string'
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        rows: 2
      },
      {
        name: 'buttonText',
        title: 'Button Text',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'link',
        title: 'Button Link',
        type: 'link',
        validation: Rule => Rule.required()
      },
      {
        name: 'backgroundColor',
        title: 'Background Color',
        type: 'string',
        options: {
          list: [
            {title: 'Default', value: 'default'},
            {title: 'Primary', value: 'primary'},
            {title: 'Secondary', value: 'secondary'},
            {title: 'Accent', value: 'accent'}
          ]
        },
        initialValue: 'default'
      },
      {
        name: 'image',
        title: 'Background Image',
        type: 'image',
        options: {
          hotspot: true
        }
      }
    ],
    preview: {
      select: {
        title: 'title',
        subtitle: 'buttonText'
      },
      prepare({title, subtitle}) {
        return {
          title: title || 'Call to Action',
          subtitle: subtitle ? `Button: ${subtitle}` : 'No button text'
        };
      }
    }
  };