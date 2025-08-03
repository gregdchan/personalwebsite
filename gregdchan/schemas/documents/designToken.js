import { defineType, defineField } from "sanity";

export default defineType({
  name: "designToken",
  title: "Design Tokens",
  type: "document",
  fields: [
    defineField({
      name: "themeName",
      title: "Theme Name",
      type: "string",
      initialValue: "default",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mode",
      title: "Mode (Light or Dark)",
      type: "string",
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isDefault",
      title: "Is Default Theme for this Mode",
      description: "Make this the default theme for light or dark mode",
      type: "boolean",
      initialValue: false,
    }),

    // Logo
    defineField({
      name: "logo",
      title: "Logo Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),

    // Colors
    defineField({
      name: "colors",
      title: "Colors",
      type: "object",
      fields: [
        defineField({ name: "primary", title: "Primary", type: "color" }),
        defineField({ name: "secondary", title: "Secondary", type: "color" }),
        defineField({ name: "background", title: "Background", type: "color" }),
        defineField({
          name: "foreground",
          title: "Foreground / Text",
          type: "color",
        }),
        defineField({
          name: "headerBackground",
          title: "Header Background",
          type: "color",
        }),
        defineField({
          name: "headerText",
          title: "Header Text",
          type: "color",
        }),
        defineField({
          name: "bodyBackground",
          title: "Body Background",
          type: "color",
        }),
        defineField({ name: "bodyText", title: "Body Text", type: "color" }),
        defineField({ name: "accent", title: "Accent", type: "color" }),
        defineField({ name: "muted", title: "Muted", type: "color" }),
      ],
    }),

    // Typography
    defineField({
      name: "typography",
      title: "Typography",
      type: "object",
      fields: [
        // Body Font
        defineField({
          name: "bodyFontFamily",
          title: "Body Font Family",
          type: "string",
          options: {
            list: [
              { title: "System UI", value: "system-ui" },
              { title: "Inter", value: "Inter, sans-serif" },
              { title: "Poppins", value: "Poppins, sans-serif" },
              { title: "Roboto", value: "Roboto, sans-serif" },
              { title: "Georgia", value: "Georgia, serif" },
              { title: "Custom", value: "custom" },
            ],
          },
        }),
        defineField({
          name: "customBodyFontFamily",
          title: "Custom Body Font (optional)",
          type: "string",
          hidden: ({ parent }) => !parent || parent.bodyFontFamily !== "custom",
        }),

        // Header Font
        defineField({
          name: "headerFontFamily",
          title: "Header Font Family",
          type: "string",
          options: {
            list: [
              { title: "Same as Body", value: "inherit" },
              { title: "Inter", value: "Inter, sans-serif" },
              { title: "Poppins", value: "Poppins, sans-serif" },
              { title: "Roboto", value: "Roboto, sans-serif" },
              { title: "Georgia", value: "Georgia, serif" },
              { title: "Custom", value: "custom" },
            ],
          },
        }),
        defineField({
          name: "customHeaderFontFamily",
          title: "Custom Header Font (optional)",
          type: "string",
          hidden: ({ parent }) =>
            !parent || parent.headerFontFamily !== "custom",
        }),

        defineField({
          name: "baseFontSize",
          title: "Base Font Size (px)",
          type: "number",
        }),
        defineField({
          name: "baseFontWeight",
          title: "Base Font Weight",
          type: "string",
          options: {
            list: [
              { title: "Light", value: "300" },
              { title: "Regular", value: "400" },
              { title: "Medium", value: "500" },
              { title: "Bold", value: "700" },
            ],
          },
        }),

        // Headings
        defineField({
          name: "headings",
          title: "Headings",
          type: "object",
          fields: ["h1", "h2", "h3", "h4", "h5", "h6"].map((tag) =>
            defineField({
              name: tag,
              title: tag.toUpperCase(),
              type: "object",
              fields: [
                defineField({
                  name: "fontSize",
                  title: "Font Size (px)",
                  type: "number",
                }),
                defineField({
                  name: "fontWeight",
                  title: "Font Weight",
                  type: "string",
                  options: {
                    list: [
                      { title: "Light", value: "300" },
                      { title: "Regular", value: "400" },
                      { title: "Medium", value: "500" },
                      { title: "Bold", value: "700" },
                      { title: "Extra Bold", value: "800" },
                    ],
                  },
                }),
                defineField({
                  name: "lineHeight",
                  title: "Line Height",
                  type: "number",
                }),
                defineField({
                  name: "letterSpacing",
                  title: "Letter Spacing (em)",
                  type: "number",
                }),
                defineField({
                  name: "textTransform",
                  title: "Text Transform",
                  type: "string",
                  options: {
                    list: [
                      { title: "None", value: "none" },
                      { title: "Uppercase", value: "uppercase" },
                      { title: "Lowercase", value: "lowercase" },
                      { title: "Capitalize", value: "capitalize" },
                    ],
                  },
                }),
              ],
            }),
          ),
        }),
      ],
    }),

    // Spacing
    defineField({
      name: "spacing",
      title: "Spacing & Radius",
      type: "object",
      fields: [
        defineField({
          name: "space",
          title: "Base Spacing Unit (px)",
          type: "number",
        }),
        defineField({
          name: "borderRadius",
          title: "Border Radius (px)",
          type: "number",
        }),
        defineField({ name: "boxShadow", title: "Box Shadow", type: "string" }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "themeName",
      subtitle: "mode",
      media: "logo",
    },
  },
});
