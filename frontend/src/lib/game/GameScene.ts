import * as THREE from 'three';
import { Ship } from './entities/Ship';
import { Asteroid } from './entities/Asteroid';
import { BlackHole } from './entities/BlackHole';
import { InputManager } from './systems/InputManager';
import { CollisionDetector } from './systems/CollisionDetector';
import { GameConfig } from './config/GameConfig';

export type GamePhase = 'ready' | 'playing' | 'transition' | 'complete';

export class GameScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;

  ship!: Ship;
  asteroids: Asteroid[] = [];
  blackHole!: BlackHole;

  inputManager: InputManager;
  collisionDetector: CollisionDetector;

  phase: GamePhase = 'ready';
  startTime: number = 0;
  elapsedTime: number = 0;

  onComplete?: () => void;

  animationFrameId?: number;

  constructor(canvas: HTMLCanvasElement) {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(GameConfig.COLORS.screenBlack);

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 20;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Systems
    this.inputManager = new InputManager();
    this.collisionDetector = new CollisionDetector();

    // Initialize entities
    this.initializeEntities();

    // Add stars background
    this.addStarfield();

    // Handle resize
    window.addEventListener('resize', () => this.handleResize());
  }

  initializeEntities() {
    // Create ship
    this.ship = new Ship(GameConfig.COLORS.shipColor);
    this.scene.add(this.ship.mesh);

    // Create asteroids
    const difficulty = GameConfig.getDifficulty(GameConfig.DIFFICULTY);
    for (let i = 0; i < difficulty.asteroidCount; i++) {
      const angle = (i / difficulty.asteroidCount) * Math.PI * 2;
      const distance = 8 + Math.random() * 4;
      const position = new THREE.Vector3(
        Math.cos(angle) * distance,
        Math.sin(angle) * distance,
        0
      );

      const size = 0.5 + Math.random() * 0.8;
      const asteroid = new Asteroid(position, GameConfig.COLORS.asteroidColor, size);
      asteroid.velocity.multiplyScalar(difficulty.asteroidSpeed);
      this.asteroids.push(asteroid);
      this.scene.add(asteroid.mesh);
    }

    // Create black hole (not visible yet)
    this.blackHole = new BlackHole();
    this.scene.add(this.blackHole.mesh);
  }

  addStarfield() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 200;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(stars);
  }

  start() {
    this.phase = 'playing';
    this.startTime = Date.now();
    this.gameLoop();
  }

  gameLoop = () => {
    if (this.phase === 'complete') return;

    const currentTime = Date.now();
    this.elapsedTime = currentTime - this.startTime;

    // Check if it's time to spawn black hole
    if (this.elapsedTime >= GameConfig.DURATION && this.phase === 'playing') {
      this.spawnBlackHole();
    }

    // Update game logic
    this.update();

    // Render
    this.renderer.render(this.scene, this.camera);

    // Continue loop
    this.animationFrameId = requestAnimationFrame(this.gameLoop);
  };

  update() {
    if (this.phase === 'playing') {
      // Get input
      const controls = this.inputManager.update();

      // Update ship
      this.ship.update(controls);

      // Update asteroids
      this.asteroids.forEach(asteroid => asteroid.update());

      // Check collisions (optional - could end game or just be visual)
      // const collision = this.collisionDetector.checkCollisions(this.ship, this.asteroids);
      // if (collision) {
      //   // Could trigger game over or just flash screen
      // }
    } else if (this.phase === 'transition') {
      // Update black hole growth
      this.blackHole.update(16); // Assuming ~60fps

      // Check if fully grown
      if (this.blackHole.isFullyGrown()) {
        this.completeGame();
      }

      // Move camera closer to black hole
      const targetZ = 5;
      this.camera.position.z += (targetZ - this.camera.position.z) * 0.02;
    }
  }

  spawnBlackHole() {
    this.phase = 'transition';

    // Spawn black hole in distance
    const spawnDistance = 15;
    const angle = Math.random() * Math.PI * 2;
    const position = new THREE.Vector3(
      Math.cos(angle) * spawnDistance,
      Math.sin(angle) * spawnDistance,
      0
    );

    this.blackHole.spawn(position);
  }

  completeGame() {
    this.phase = 'complete';

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    // Trigger completion callback
    if (this.onComplete) {
      this.onComplete();
    }
  }

  handleResize() {
    const canvas = this.renderer.domElement;
    this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  }

  cleanup() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.inputManager.cleanup();

    // Dispose Three.js resources
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (object.material instanceof THREE.Material) {
          object.material.dispose();
        }
      }
    });

    this.renderer.dispose();
  }
}
