// objects/seo.js
export default {
    name: 'seo',
    title: 'SEO & Social Sharing',
    type: 'object',
    options: {
      collapsible: true,
      collapsed: true
    },
    fields: [
      {
        name: 'metaTitle',
        title: 'Meta Title',
        type: 'string',
        description: 'Title used for search engines and browser tabs (max 60 chars)',
        validation: Rule => Rule.max(60).warning('Longer titles may be truncated by search engines')
      },
      {
        name: 'metaDescription',
        title: 'Meta Description',
        type: 'text',
        rows: 3,
        description: 'Description for search engines (max 160 chars)',
        validation: Rule => Rule.max(160).warning('Longer descriptions may be truncated by search engines')
      },
      {
        name: 'keywords',
        title: 'Keywords',
        type: 'array',
        of: [{type: 'string'}],
        options: {
          layout: 'tags'
        }
      },
      {
        name: 'socialImage',
        title: 'Social Media Image',
        type: 'image',
        description: 'Image for sharing on social media (Facebook, Twitter, etc.)',
        options: {
          hotspot: true
        }
      },
      {
        name: 'socialTitle',
        title: 'Social Media Title',
        type: 'string',
        description: 'Title used when sharing on social media (if different from Meta Title)'
      },
      {
        name: 'socialDescription',
        title: 'Social Media Description',
        type: 'text',
        rows: 3,
        description: 'Description used when sharing on social media (if different from Meta Description)'
      }
    ]
  };