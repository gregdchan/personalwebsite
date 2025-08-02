// documents/portfolioProject.js
import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'portfolioProject',
  title: 'Portfolio Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string'
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'mainImage',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'gallery'
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: {type: 'category'}
        })
      ]
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: {type: 'tag'}
        })
      ]
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    })
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'mainImage'
    },
    prepare({title, client, media}) {
      return {
        title,
        subtitle: client ? `Client: ${client}` : '',
        media
      }
    }
  }
})