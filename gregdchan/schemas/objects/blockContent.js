// objects/blockContent.js
export default {
    title: 'Block Content',
    name: 'blockContent',
    type: 'array',
    of: [
      {
        title: 'Block',
        type: 'block',
        styles: [
          {title: 'Normal', value: 'normal'},
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'Quote', value: 'blockquote'}
        ],
        lists: [
          {title: 'Bullet', value: 'bullet'},
          {title: 'Number', value: 'number'}
        ],
        marks: {
          decorators: [
            {title: 'Strong', value: 'strong'},
            {title: 'Emphasis', value: 'em'},
            {title: 'Code', value: 'code'},
            {title: 'Underline', value: 'underline'},
            {title: 'Strike', value: 'strike-through'}
          ],
          annotations: [
            {
              title: 'URL',
              name: 'link',
              type: 'object',
              fields: [
                {
                  title: 'URL',
                  name: 'href',
                  type: 'url',
                  validation: Rule => Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel']
                  })
                },
                {
                  title: 'Open in new tab',
                  name: 'blank',
                  type: 'boolean',
                  initialValue: true
                }
              ]
            }
          ]
        }
      },
      {
        type: 'mainImage',
        options: {hotspot: true}
      },
      {
        type: 'gallery'
      },
      {
        type: 'callToAction'
      },
      {
        type: 'embed'
      },
      {
        type: 'code',
        title: 'Code Block',
        options: {
          withFilename: true
        }
      }
    ]
  };