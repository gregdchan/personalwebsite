import * as THREE from 'three';

export class BlackHole {
  mesh: THREE.Mesh;
  outerGlow: THREE.Mesh;
  targetScale: number = 50;
  currentScale: number = 0;
  growthRate: number = 0.5;
  isActive: boolean = false;

  constructor() {
    // Create black hole with event horizon glow
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0x000000
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.scale.set(0, 0, 0);

    // Outer glow
    const glowGeometry = new THREE.SphereGeometry(1.2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x9370db,
      transparent: true,
      opacity: 0.3,
      wireframe: true
    });

    this.outerGlow = new THREE.Mesh(glowGeometry, glowMaterial);
    this.outerGlow.scale.set(0, 0, 0);
    this.mesh.add(this.outerGlow);
  }

  spawn(position: THREE.Vector3) {
    this.mesh.position.copy(position);
    this.isActive = true;
  }

  update(deltaTime: number) {
    if (!this.isActive) return;

    // Grow the black hole
    if (this.currentScale < this.targetScale) {
      this.currentScale += this.growthRate * deltaTime * 0.01;
      this.mesh.scale.set(this.currentScale, this.currentScale, this.currentScale);
      this.outerGlow.scale.set(1.2, 1.2, 1.2);
    }

    // Pulse the glow
    const pulse = Math.sin(Date.now() * 0.003) * 0.1 + 0.9;
    (this.outerGlow.material as THREE.MeshBasicMaterial).opacity = pulse * 0.3;

    // Rotate slowly
    this.mesh.rotation.z += 0.01;
  }

  getScale(): number {
    return this.currentScale;
  }

  isFullyGrown(): boolean {
    return this.currentScale >= this.targetScale * 0.95;
  }
}
