import {defineType, defineField, defineArrayMember} from 'sanity';

export default defineType({
  name: 'videoHero',
  title: 'Video Hero',
  type: 'object',
  fields: [
    defineField({ 
      name: 'title', 
      title: 'Title', 
      type: 'string',
      validation: Rule => Rule.required() 
    }),
    defineField({ 
      name: 'subtitle', 
      title: 'Subtitle', 
      type: 'string' 
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*'
      }
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'External video URL (YouTube, Vimeo, etc.)'
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image',
      type: 'image',
      description: 'Image shown before video plays',
      options: { hotspot: true }
    }),
    defineField({
      name: 'overlay',
      title: 'Overlay Color',
      type: 'color',
      description: 'Optional color overlay for video'
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      type: 'number',
      validation: Rule => Rule.min(0).max(1),
      initialValue: 0.5
    }),
    defineField({
      name: 'actions',
      title: 'Call to Action Buttons',
      type: 'array',
      of: [defineArrayMember({ type: 'link' })]
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'loop',
      title: 'Loop Video',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'muted',
      title: 'Muted',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      description: 'Optional link for the hero section'
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'posterImage'
    }
  }
});