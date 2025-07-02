import type { SanityCodegenConfig } from '@sanity-codegen/cli';

const config: SanityCodegenConfig = {
  // <-- no schemaPath here!
  root: './schemas',   // point at folder holding all your .js definitions
  schemaTypesOutputPath: '../frontend/src/lib/sanity/types.ts',
};

export default config;
