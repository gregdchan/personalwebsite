export class GameConfig {
  // Game settings (no Sanity dependency)
  static DURATION = 10000; // 10 seconds
  static DIFFICULTY = 'medium';
  static MUSIC_ENABLED = true;
  static SKIP_ENABLED = true;

  // Difficulty presets
  static DIFFICULTIES = {
    easy: { asteroidCount: 8, asteroidSpeed: 0.5 },
    medium: { asteroidCount: 12, asteroidSpeed: 0.8 },
    hard: { asteroidCount: 20, asteroidSpeed: 1.2 }
  };

  // 80s Color Palette
  static COLORS = {
    screenBlack: 0x000814,
    arcadeBlue: 0x5b9bd5,
    arcadeCyan: 0x00bcd4,
    arcadeOrange: 0xff9933,
    arcadePink: 0xff6b9d,
    arcadeYellow: 0xffd700,
    arcadeGreen: 0x7cb342,
    shipColor: 0x00bcd4,
    asteroidColor: 0xff9933,
    particleColor: 0xffd700,
    blackHoleColor: 0x000000
  };

  // Controls
  static CONTROLS = {
    desktop: {
      up: ['ArrowUp', 'KeyW'],
      down: ['ArrowDown', 'KeyS'],
      left: ['ArrowLeft', 'KeyA'],
      right: ['ArrowRight', 'KeyD'],
      skip: ['Space', 'Escape']
    },
    mobile: {
      joystickEnabled: true,
      tiltEnabled: false
    }
  };

  // Instructions
  static INSTRUCTIONS = {
    desktop: 'USE ARROW KEYS OR WASD TO MOVE\nAVOID ASTEROIDS\nSURVIVE AS LONG AS YOU CAN',
    mobile: 'USE ON-SCREEN JOYSTICK TO MOVE\nAVOID ASTEROIDS\nSURVIVE AS LONG AS YOU CAN'
  };

  static getDifficulty(level = 'medium') {
    return this.DIFFICULTIES[level] || this.DIFFICULTIES.medium;
  }
}
