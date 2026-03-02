import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'projectGrid',
    title: 'Project Grid (Cinematic)',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            initialValue: 'Selected Projects'
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
            initialValue: 'Portfolio'
        }),
        defineField({
            name: 'limit',
            title: 'Limit',
            type: 'number',
            description: 'Maximum number of projects to show',
            initialValue: 6
        }),
        defineField({
            name: 'category',
            title: 'Category Filter',
            type: 'string',
            description: 'Optional category slug to filter projects'
        })
    ],
    preview: {
        select: { title: 'heading' },
        prepare({ title }) {
            return {
                title: title,
                subtitle: 'Project Grid (Cinematic)'
            }
        }
    }
});
