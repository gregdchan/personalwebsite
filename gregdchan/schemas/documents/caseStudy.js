// documents/caseStudy.js
import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
    name: 'caseStudy',
    title: 'Case Studies',
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
        description: 'The URL path of this case study',
        options: {
          source: 'title',
        },
        validation: Rule => Rule.required()
      }),
      defineField({
        name: 'mainImage',
        title: 'Main Image',
        type: 'mainImage',
        description: 'Featured image for the case study'
      }),
      defineField({
        name: 'client',
        title: 'Client',
        type: 'string'
      }),
      defineField({
        name: 'industry',
        title: 'Industry',
        type: 'string'
      }),
      defineField({
        name: 'projectDuration',
        title: 'Project Duration',
        type: 'string',
        description: 'e.g. "3 months", "Jan-Mar 2023"'
      }),
      defineField({
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [defineArrayMember({type: 'reference', to: {type: 'category'}})]
      }),
      defineField({
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [defineArrayMember({type: 'reference', to: {type: 'tag'}})],
        options: {
          layout: 'tags'
        }
      }),
      defineField({
        name: 'overview',
        title: 'Project Overview',
        type: 'text',
        rows: 4
      }),
      defineField({
        name: 'challenge',
        title: 'The Challenge',
        type: 'blockContent',
        description: 'Describe the problem or challenge faced'
      }),
      defineField({
        name: 'approach',
        title: 'The Approach',
        type: 'blockContent',
        description: 'Explain your strategy and methodology'
      }),
      defineField({
        name: 'solution',
        title: 'The Solution',
        type: 'blockContent',
        description: 'Describe what was delivered'
      }),
      defineField({
        name: 'results',
        title: 'The Results',
        type: 'blockContent',
        description: 'Explain the outcomes and impact'
      }),
      defineField({
        name: 'gallery',
        title: 'Project Gallery',
        type: 'gallery'
      }),
      defineField({
        name: 'testimonials',
        title: 'Testimonials',
        type: 'array',
        of: [defineArrayMember({type: 'testimonial'})]
      }),
      defineField({
        name: 'relatedProjects',
        title: 'Related Projects',
        type: 'array',
        of: [
          defineArrayMember({
            type: 'reference', 
            to: [{type: 'portfolioProject'}, {type: 'caseStudy'}]
          })
        ]
      }),
      defineField({
        name: 'seo',
        title: 'SEO & Social',
        type: 'seo'
      })
    ],
    preview: {
      select: {
        title: 'title',
        client: 'client',
        media: 'mainImage'
      },
      prepare({ title, client, media }) {
        return {
          title,
          subtitle: client ? `Client: ${client}` : 'Case Study',
          media
        };
      }
    }
})