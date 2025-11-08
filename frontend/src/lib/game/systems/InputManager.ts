import { GameConfig } from '../config/GameConfig';

export class InputManager {
  keys: Map<string, boolean> = new Map();
  isMobile: boolean;
  controls: { thrust: boolean; rotate: number } = { thrust: false, rotate: 0 };

  constructor() {
    this.isMobile = this.detectMobile();
    this.setupKeyboardListeners();
  }

  detectMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  setupKeyboardListeners() {
    window.addEventListener('keydown', (e) => {
      this.keys.set(e.code, true);
    });

    window.addEventListener('keyup', (e) => {
      this.keys.set(e.code, false);
    });
  }

  update(): { thrust: boolean; rotate: number } {
    const config = GameConfig.CONTROLS.desktop;

    // Check thrust keys
    const thrustKeys = [...config.up];
    this.controls.thrust = thrustKeys.some(key => this.keys.get(key));

    // Check rotation keys
    const leftKeys = [...config.left];
    const rightKeys = [...config.right];

    const leftPressed = leftKeys.some(key => this.keys.get(key));
    const rightPressed = rightKeys.some(key => this.keys.get(key));

    if (leftPressed && !rightPressed) {
      this.controls.rotate = 1;
    } else if (rightPressed && !leftPressed) {
      this.controls.rotate = -1;
    } else {
      this.controls.rotate = 0;
    }

    return this.controls;
  }

  isSkipPressed(): boolean {
    const skipKeys = GameConfig.CONTROLS.desktop.skip;
    return skipKeys.some(key => this.keys.get(key));
  }

  cleanup() {
    this.keys.clear();
  }
}
