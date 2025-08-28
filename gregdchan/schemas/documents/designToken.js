import { defineType, defineField } from "sanity";

export default defineType({
  name: "designToken",
  title: "Design Tokens",
  type: "document",
  groups: [
    { name: "theme", title: "Theme" },
    { name: "brand", title: "Brand" },
    { name: "colors", title: "Colors" },
    { name: "typography", title: "Typography" },
    { name: "spacing", title: "Spacing" },
  ],
  fields: [
    // Theme meta
    defineField({
      name: "themeName",
      title: "Theme Name",
      type: "string",
      initialValue: "default",
      validation: (Rule) => Rule.required(),
      group: "theme",
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
      group: "theme",
    }),
    defineField({
      name: "isDefault",
      title: "Is Default Theme for this Mode",
      description: "Make this the default theme for light or dark mode",
      type: "boolean",
      initialValue: false,
      group: "theme",
    }),

    // Brand
    defineField({
      name: "logo",
      title: "Brand Logo",
      type: "image",
      options: { hotspot: true },
      group: "brand",
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),

    // Colors (grouped, renamed to avoid confusion with “headings” vs “header”)
    defineField({
      name: "colors",
      title: "Colors",
      type: "object",
      group: "colors",
      options: { collapsible: true, collapsed: false },
      fields: [
        // Brand colors
        defineField({
          name: "brand",
          title: "Brand",
          type: "object",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({ name: "primary", title: "Primary", type: "color" }),
            defineField({ name: "secondary", title: "Secondary", type: "color" }),
            defineField({ name: "accent", title: "Accent", type: "color" }),
          ],
        }),
        // Surfaces (page/body, content, site header)
        defineField({
          name: "surfaces",
          title: "Surfaces",
          type: "object",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({ name: "page", title: "Page Background", type: "color" }),
            defineField({ name: "content", title: "Content Background", type: "color" }),
            defineField({ name: "siteHeader", title: "Site Header Background", type: "color" }),
          ],
        }),
        // Text colors
        defineField({
          name: "text",
          title: "Text",
          type: "object",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({ name: "primary", title: "Primary Text", type: "color" }),
            defineField({ name: "muted", title: "Muted Text", type: "color" }),
            defineField({ name: "siteHeader", title: "Site Header Text", type: "color" }),
          ],
        }),
        // Heading colors: default + per level
        defineField({
          name: "headings",
          title: "Headings",
          type: "object",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({ name: "default", title: "Default Heading Color", type: "color" }),
            defineField({ name: "h1", title: "H1 Color (optional)", type: "color" }),
            defineField({ name: "h2", title: "H2 Color (optional)", type: "color" }),
            defineField({ name: "h3", title: "H3 Color (optional)", type: "color" }),
            defineField({ name: "h4", title: "H4 Color (optional)", type: "color" }),
            defineField({ name: "h5", title: "H5 Color (optional)", type: "color" }),
            defineField({ name: "h6", title: "H6 Color (optional)", type: "color" }),
          ],
        }),
      ],
    }),

    // Typography
    defineField({
      name: "typography",
      title: "Typography",
      type: "object",
      group: "typography",
      options: { collapsible: true, collapsed: false },
      fields: [
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

        // Renamed from "headerFontFamily" to "headingFontFamily" to avoid confusion
        defineField({
          name: "headingFontFamily",
          title: "Heading Font Family",
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
          name: "customHeadingFontFamily",
          title: "Custom Heading Font (optional)",
          type: "string",
          hidden: ({ parent }) => !parent || parent.headingFontFamily !== "custom",
        }),

        defineField({ name: "baseFontSize", title: "Base Font Size (px)", type: "number" }),
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

        // Heading level styles
        defineField({
          name: "levels",
          title: "Heading Levels",
          type: "object",
          options: { collapsible: true, collapsed: true },
          fields: ["h1", "h2", "h3", "h4", "h5", "h6"].map((tag) =>
            defineField({
              name: tag,
              title: tag.toUpperCase(),
              type: "object",
              fields: [
                defineField({ name: "fontSize", title: "Font Size (px)", type: "number" }),
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
                defineField({ name: "lineHeight", title: "Line Height", type: "number" }),
                defineField({ name: "letterSpacing", title: "Letter Spacing (em)", type: "number" }),
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
            })
          ),
        }),
        // New: Header typography
        defineField({
          name: "header",
          title: "Header Typography",
          type: "object",
          options: { collapsible: true, collapsed: true },
          fields: [
            defineField({
              name: "fontFamily",
              title: "Header Font Family",
              type: "string",
              options: {
                list: [
                  { title: "Inherit Heading", value: "inherit" },
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
              name: "customHeaderFontFamily",
              title: "Custom Header Font (optional)",
              type: "string",
              hidden: ({ parent }) => !parent || parent.fontFamily !== "custom",
            }),
            defineField({
              name: "fontSize",
              title: "Header Font Size (px)",
              type: "number",
            }),
            // NEW: header font weight
            defineField({
              name: "fontWeight",
              title: "Header Font Weight",
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
          ],
        }),
      ],
    }),

    // Spacing
    defineField({
      name: "spacing",
      title: "Spacing & Radius",
      type: "object",
      group: "spacing",
      fields: [
        // Renamed "space" -> "spaceUnit" for clarity
        defineField({ name: "spaceUnit", title: "Base Spacing Unit (px)", type: "number" }),
        defineField({ name: "borderRadius", title: "Border Radius (px)", type: "number" }),
        defineField({ name: "boxShadow", title: "Box Shadow", type: "string" }),
      ],
    }),
  ],

  preview: {
    select: { title: "themeName", subtitle: "mode", media: "logo" },
  },
});
