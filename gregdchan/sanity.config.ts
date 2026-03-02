import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { colorInput } from '@sanity/color-input'
import { codeInput } from '@sanity/code-input'
import { media } from 'sanity-plugin-media'
import schemaTypes from './schemas' // 👈 index.js or index.ts for schemas

export default defineConfig({
  name: 'default',
  title: 'gregdchan',

  projectId: 'smxz6rsz',
  dataset: 'production',

  // Sanity v3+ plugins
  plugins: [
    structureTool(), // Replaces deprecated deskTool()
    media(),
    colorInput(),
    codeInput()
  ],

  schema: {
    types: schemaTypes
  }
})
