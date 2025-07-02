import { defineType } from 'sanity';

export default defineType({
  name: 'designToken',
  title: 'Design Tokens',
  type: 'document',
  fields: [
    {
      name: 'themeName',
      title: 'Theme Name',
      type: 'string',
      initialValue: 'default',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mode',
      title: 'Mode (Light or Dark)',
      type: 'string',
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'colors',
      title: 'Colors',
      type: 'object',
      fields: [
        { name: 'primary', title: 'Primary', type: 'color' },
        { name: 'secondary', title: 'Secondary', type: 'color' },
        { name: 'background', title: 'Background', type: 'color' },
        { name: 'foreground', title: 'Foreground / Text', type: 'color' },
        { name: 'accent', title: 'Accent', type: 'color' },
        { name: 'muted', title: 'Muted', type: 'color' },
      ],
    },

    {
      name: 'typography',
      title: 'Typography',
      type: 'object',
      fields: [
        {
          name: 'baseFontFamily',
          title: 'Base Font Family',
          type: 'string',
          options: {
            list: [
              { title: 'System UI', value: 'system-ui' },
              { title: 'Inter', value: 'Inter, sans-serif' },
              { title: 'Poppins', value: 'Poppins, sans-serif' },
              { title: 'Roboto', value: 'Roboto, sans-serif' },
              { title: 'Georgia', value: 'Georgia, serif' },
              { title: 'Custom', value: '' },
            ],
          },
        },
        {
          name: 'customBaseFontFamily',
          title: 'Custom Base Font (optional)',
          type: 'string',
          hidden: ({ parent }) => parent?.baseFontFamily !== '',
        },
        {
          name: 'baseFontSize',
          title: 'Base Font Size (px)',
          type: 'number',
        },
        {
          name: 'baseFontWeight',
          title: 'Base Font Weight',
          type: 'string',
          options: {
            list: [
              { title: 'Light', value: '300' },
              { title: 'Regular', value: '400' },
              { title: 'Medium', value: '500' },
              { title: 'Bold', value: '700' },
            ],
          },
        },
        {
          name: 'headings',
          title: 'Headings',
          type: 'object',
          fields: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((tag) => ({
            name: tag,
            title: tag.toUpperCase(),
            type: 'object',
            fields: [
              {
                name: 'fontSize',
                title: 'Font Size (px)',
                type: 'number',
              },
              {
                name: 'fontWeight',
                title: 'Font Weight',
                type: 'string',
                options: {
                  list: [
                    { title: 'Light', value: '300' },
                    { title: 'Regular', value: '400' },
                    { title: 'Medium', value: '500' },
                    { title: 'Bold', value: '700' },
                    { title: 'Extra Bold', value: '800' },
                  ],
                },
              },
              {
                name: 'lineHeight',
                title: 'Line Height',
                type: 'number',
              },
              {
                name: 'letterSpacing',
                title: 'Letter Spacing (em)',
                type: 'number',
              },
              {
                name: 'textTransform',
                title: 'Text Transform',
                type: 'string',
                options: {
                  list: [
                    { title: 'None', value: 'none' },
                    { title: 'Uppercase', value: 'uppercase' },
                    { title: 'Lowercase', value: 'lowercase' },
                    { title: 'Capitalize', value: 'capitalize' },
                  ],
                },
              },
            ],
          })),
        },
      ],
    },

    {
      name: 'spacing',
      title: 'Spacing & Radius',
      type: 'object',
      fields: [
        {
          name: 'space',
          title: 'Base Spacing Unit (px)',
          type: 'number',
        },
        {
          name: 'borderRadius',
          title: 'Border Radius (px)',
          type: 'number',
        },
        {
          name: 'boxShadow',
          title: 'Box Shadow',
          type: 'string',
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'themeName',
      subtitle: 'mode',
    },
  },
});
