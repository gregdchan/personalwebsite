// sanity-plugins.d.ts
declare module '@sanity/vision' {
    import type {Plugin} from 'sanity'
    const visionTool: Plugin
    export { visionTool }
  }
  
  declare module '@sanity/color-input' {
    import type {Plugin} from 'sanity'
    const colorInput: Plugin
    export { colorInput }
  }
  