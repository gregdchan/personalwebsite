import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contactCta',
  title: 'Contact CTA',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Let’s build something great' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2, initialValue: 'I’m available for select projects, consulting, and collaboration.' }),
    defineField({ name: 'primaryCta', title: 'Primary CTA', type: 'cta' }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'cta' }),
    defineField({ name: 'backgroundColor', title: 'Background Color', type: 'color' }),
    defineField({ name: 'secondaryColor', title: 'Secondary Color', type: 'color' })
  ],
  preview: { select: { title: 'heading' } }
});