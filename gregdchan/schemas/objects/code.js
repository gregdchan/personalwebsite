// objects/code.js
import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'code',
    title: 'Code',
    type: 'object',
    fields: [
      defineField({
        name: 'language',
        title: 'Language',
        type: 'string',
        options: {
          list: [
            { title: 'JavaScript', value: 'javascript' },
            { title: 'HTML', value: 'html' },
            { title: 'CSS', value: 'css' },
            { title: 'TypeScript', value: 'typescript' },
            { title: 'JSX', value: 'jsx' },
            { title: 'JSON', value: 'json' },
            { title: 'PHP', value: 'php' },
            { title: 'Python', value: 'python' },
            { title: 'Bash', value: 'bash' },
            { title: 'Plain text', value: 'text' }
          ]
        }
      }),
      defineField({
        name: 'filename',
        title: 'Filename',
        type: 'string'
      }),
      defineField({
        name: 'code',
        title: 'Code',
        type: 'text',
        rows: 10
      })
    ]
  })
  