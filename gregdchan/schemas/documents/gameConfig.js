export default {
  name: 'gameConfig',
  type: 'document',
  title: 'Asteroids Game Configuration',
  __experimental_actions: ['update', 'create', 'delete', 'publish'],
  fields: [
    {
      name: 'enabled',
      type: 'boolean',
      title: 'Enable Game Intro',
      description: 'Show asteroids game on first visit per session',
      initialValue: true
    },
    {
      name: 'gameDuration',
      type: 'number',
      title: 'Game Duration (seconds)',
      description: 'How long the game lasts before black hole appears',
      validation: Rule => Rule.min(5).max(30),
      initialValue: 10
    },
    {
      name: 'difficulty',
      type: 'string',
      title: 'Difficulty Level',
      options: {
        list: [
          { title: 'Easy (8 asteroids)', value: 'easy' },
          { title: 'Medium (12 asteroids)', value: 'medium' },
          { title: 'Hard (20 asteroids)', value: 'hard' }
        ]
      },
      initialValue: 'medium'
    },
    {
      name: 'musicEnabled',
      type: 'boolean',
      title: 'Enable 80s Chiptune Music',
      description: 'Play background music during gameplay',
      initialValue: true
    },
    {
      name: 'skipButton',
      type: 'boolean',
      title: 'Show Skip Button',
      description: 'Allow users to skip the intro game',
      initialValue: true
    },
    {
      name: 'instructions',
      type: 'object',
      title: 'Game Instructions',
      fields: [
        {
          name: 'desktop',
          type: 'text',
          title: 'Desktop Instructions',
          rows: 3,
          initialValue: 'USE ARROW KEYS OR WASD TO MOVE\nAVOID ASTEROIDS\nSURVIVE AS LONG AS YOU CAN'
        },
        {
          name: 'mobile',
          type: 'text',
          title: 'Mobile Instructions',
          rows: 3,
          initialValue: 'USE ON-SCREEN JOYSTICK TO MOVE\nTILT TO STEER\nAVOID ASTEROIDS'
        }
      ]
    },
    {
      name: 'colors',
      type: 'object',
      title: '80s Retro Color Palette',
      description: 'Authentic 80s gaming colors (C64/NES inspired)',
      fields: [
        {
          name: 'screenBlack',
          type: 'color',
          title: 'CRT Screen Black',
          initialValue: { hex: '#000814' }
        },
        {
          name: 'arcadeBlue',
          type: 'color',
          title: 'Arcade Blue',
          initialValue: { hex: '#5b9bd5' }
        },
        {
          name: 'arcadeOrange',
          type: 'color',
          title: 'Arcade Orange',
          initialValue: { hex: '#ff9933' }
        },
        {
          name: 'arcadePink',
          type: 'color',
          title: 'Arcade Pink',
          initialValue: { hex: '#ff6b9d' }
        },
        {
          name: 'arcadeYellow',
          type: 'color',
          title: 'Arcade Yellow',
          initialValue: { hex: '#ffd700' }
        },
        {
          name: 'arcadeGreen',
          type: 'color',
          title: 'Arcade Green',
          initialValue: { hex: '#7cb342' }
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Asteroids Game Configuration'
      }
    }
  }
}
