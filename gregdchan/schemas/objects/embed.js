
// objects/embed.js
export default {
    name: 'embed',
    title: 'Embed',
    type: 'object',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string'
      },
      {
        name: 'embedType',
        title: 'Embed Type',
        type: 'string',
        options: {
          list: [
            {title: 'YouTube', value: 'youtube'},
            {title: 'Vimeo', value: 'vimeo'},
            {title: 'SoundCloud', value: 'soundcloud'},
            {title: 'Custom', value: 'custom'}
          ],
          layout: 'radio'
        },
        initialValue: 'youtube'
      },
      {
        name: 'url',
        title: 'URL',
        type: 'url',
        description: 'The URL to the content you want to embed',
        hidden: ({parent}) => parent?.embedType === 'custom'
      },
      {
        name: 'code',
        title: 'Embed Code',
        type: 'text',
        description: 'Paste the embed code here',
        hidden: ({parent}) => parent?.embedType !== 'custom'
      },
      {
        name: 'caption',
        title: 'Caption',
        type: 'string'
      }
    ],
    preview: {
      select: {
        title: 'title',
        embedType: 'embedType'
      },
      prepare({title, embedType}) {
        return {
          title: title || 'Untitled Embed',
          subtitle: `${embedType.charAt(0).toUpperCase() + embedType.slice(1)} Embed`
        };
      }
    }
  };