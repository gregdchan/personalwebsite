import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { colorInput } from '@sanity/color-input';
import { schemaTypes } from './schemas/schema';

export default defineConfig({
  name: 'default',
  title: 'gregdchan',
  projectId: 'smxz6rsz',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
    colorInput(),
  ],
  schema: {
    // ← cast here
    types: schemaTypes as any /* or better: SchemaTypeDefinition[] */,
  },
});
