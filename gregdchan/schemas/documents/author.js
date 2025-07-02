// documents/author.js
export default {
    name: 'author',
    title: 'Authors',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'image',
        title: 'Profile Image',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'bio',
        title: 'Bio',
        type: 'array',
        of: [
          {
            title: 'Block',
            type: 'block',
            styles: [{title: 'Normal', value: 'normal'}],
            lists: []
          }
        ]
      },
      {
        name: 'role',
        title: 'Role/Position',
        type: 'string'
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string'
      },
      {
        name: 'social',
        title: 'Social Media',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'socialLink',
            fields: [
              {
                name: 'platform',
                title: 'Platform',
                type: 'string',
                options: {
                  list: [
                    {title: 'Twitter', value: 'twitter'},
                    {title: 'LinkedIn', value: 'linkedin'},
                    {title: 'Instagram', value: 'instagram'},
                    {title: 'Facebook', value: 'facebook'},
                    {title: 'GitHub', value: 'github'},
                    {title: 'Website', value: 'website'},
                    {title: 'Other', value: 'other'}
                  ]
                }
              },
              {
                name: 'url',
                title: 'URL',
                type: 'url'
              }
            ],
            preview: {
              select: {
                title: 'platform',
                subtitle: 'url'
              }
            }
          }
        ]
      }
    ],
    preview: {
      select: {
        title: 'name',
        subtitle: 'role',
        media: 'image'
      }
    }
  };
  