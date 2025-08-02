import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'threeJsSection',
  title: '3D Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'sceneType',
      title: 'Scene Type',
      type: 'string',
      options: {
        list: [
          {title: 'Model Viewer', value: 'modelViewer'},
          {title: 'Particle Effect', value: 'particles'},
          {title: 'Custom Scene', value: 'custom'},
        ],
        layout: 'radio',
      },
      initialValue: 'modelViewer',
    }),
    defineField({
      name: 'modelUrl',
      title: '3D Model URL (GLB/GLTF)',
      type: 'url',
      hidden: ({parent}) => parent?.sceneType !== 'modelViewer',
    }),
    defineField({
      name: 'particleOptions',
      title: 'Particle Options',
      type: 'object',
      hidden: ({parent}) => parent?.sceneType !== 'particles',
      fields: [
        defineField({
          name: 'count',
          title: 'Particle Count',
          type: 'number',
          initialValue: 1000,
        }),
        defineField({
          name: 'color',
          title: 'Particle Color',
          type: 'color',
        }),
        defineField({
          name: 'size',
          title: 'Particle Size',
          type: 'number',
          initialValue: 0.05,
        }),
      ],
    }),
    defineField({
      name: 'customSceneCode',
      title: 'Custom Scene Code',
      description: 'JavaScript code for custom Three.js scene (advanced)',
      type: 'text',
      rows: 10,
      hidden: ({parent}) => parent?.sceneType !== 'custom',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
    }),
    defineField({
      name: 'height',
      title: 'Section Height (vh)',
      type: 'number',
      initialValue: 50,
    }),
    defineField({
      name: 'interactivity',
      title: 'Interactivity',
      type: 'object',
      fields: [
        defineField({
          name: 'allowRotation',
          title: 'Allow Rotation',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'allowZoom',
          title: 'Allow Zoom',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'mouseFollow',
          title: 'Follow Mouse Movement',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
  ],
})