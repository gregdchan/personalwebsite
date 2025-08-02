import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Authors',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Block',
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: []
        })
      ]
    }),
    defineField({
      name: 'role',
      title: 'Role/Position',
      type: 'string'
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string'
    }),
    defineField({
      name: 'social',
      title: 'Social Media',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
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
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url'
            })
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url'
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image'
    }
  }
})
