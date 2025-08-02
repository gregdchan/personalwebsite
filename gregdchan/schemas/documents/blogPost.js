// documents/blogPost.js
import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
    name: 'blogPost',
    title: 'Blog Posts',
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
        description: 'The URL path of this blog post',
        options: {
          source: 'title',
        },
        validation: Rule => Rule.required()
      }),
      defineField({
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{ type: 'author' }]
      }),
      defineField({
        name: 'mainImage',
        title: 'Main Image',
        type: 'mainImage',
        description: 'Featured image for the blog post'
      },
      {
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'category' } }]
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'tag' } }],
        options: {
          layout: 'tags'
        }
      },
      {
        name: 'publishedAt',
        title: 'Published At',
        type: 'datetime',
        description: 'Date and time of publication',
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm',
          timeStep: 15,
          calendarTodayLabel: 'Today'
        }
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text',
        description: 'A short summary of the blog post',
        rows: 3
      },
      {
        name: 'content',
        title: 'Blog Content',
        type: 'blockContent'
      },
      {
        name: 'relatedPosts',
        title: 'Related Posts',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'blogPost' } }]
      }),
      defineField({
        name: 'seo',
        title: 'SEO & Social',
        type: 'seo'
      })
    ],
    orderings: [
      {
        title: 'Publication Date, New',
        name: 'publishedAtDesc',
        by: [{ field: 'publishedAt', direction: 'desc' }]
      },
      {
        title: 'Publication Date, Old',
        name: 'publishedAtAsc',
        by: [{ field: 'publishedAt', direction: 'asc' }]
      }
    ],
    preview: {
      select: {
        title: 'title',
        author: 'author.name',
        date: 'publishedAt',
        media: 'mainImage'
      },
      prepare({ title, author, date, media }) {
        return {
          title,
          subtitle: author && date ? `by ${author} on ${new Date(date).toLocaleDateString()}` : 'Draft',
          media
        };
      }
    }
  });