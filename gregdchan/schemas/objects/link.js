
// objects/link.js
export default {
    name: 'link',
    title: 'Link',
    type: 'object',
    fields: [
      {
        name: 'linkType',
        title: 'Link Type',
        type: 'string',
        options: {
          list: [
            {title: 'Internal', value: 'internal'},
            {title: 'External', value: 'external'}
          ],
          layout: 'radio',
          direction: 'horizontal'
        },
        initialValue: 'internal',
        validation: Rule => Rule.required()
      },
      {
        name: 'internalLink',
        title: 'Internal Link',
        description: 'Select an internal document to link to',
        type: 'reference',
        to: [
          {type: 'page'},
          {type: 'blogPost'},
          {type: 'portfolioProject'},
          {type: 'caseStudy'}
        ],
        hidden: ({parent}) => parent?.linkType !== 'internal'
      },
      {
        name: 'href',
        title: 'URL',
        type: 'url',
        description: 'External URL to link to',
        hidden: ({parent}) => parent?.linkType !== 'external',
        validation: Rule => Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel']
        })
      },
      {
        name: 'blank',
        title: 'Open in new tab',
        type: 'boolean',
        initialValue: true,
        hidden: ({parent}) => parent?.linkType !== 'external'
      }
    ],
    preview: {
      select: {
        linkType: 'linkType',
        internalTitle: 'internalLink.title',
        externalUrl: 'href'
      },
      prepare({linkType, internalTitle, externalUrl}) {
        const title = linkType === 'internal' ? internalTitle : externalUrl;
        return {
          title: title || 'Undefined Link',
          subtitle: linkType === 'internal' ? 'Internal Link' : 'External Link'
        };
      }
    }
  };
  