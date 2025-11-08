import * as THREE from 'three';

export class Ship {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  acceleration: number = 0.05;
  maxSpeed: number = 0.3;
  drag: number = 0.98;
  rotationSpeed: number = 0.1;

  constructor(color: number = 0x00bcd4) {
    // Create simple ship geometry (triangle)
    const geometry = new THREE.ConeGeometry(0.3, 1, 3);
    const material = new THREE.MeshBasicMaterial({
      color,
      wireframe: true
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.x = Math.PI / 2;
    this.velocity = new THREE.Vector3(0, 0, 0);
  }

  update(controls: { thrust: boolean; rotate: number }) {
    // Rotation
    if (controls.rotate !== 0) {
      this.mesh.rotation.z += controls.rotate * this.rotationSpeed;
    }

    // Thrust
    if (controls.thrust) {
      const angle = this.mesh.rotation.z;
      this.velocity.x += Math.cos(angle) * this.acceleration;
      this.velocity.y += Math.sin(angle) * this.acceleration;
    }

    // Apply velocity
    this.velocity.multiplyScalar(this.drag);

    // Clamp max speed
    const speed = this.velocity.length();
    if (speed > this.maxSpeed) {
      this.velocity.normalize().multiplyScalar(this.maxSpeed);
    }

    this.mesh.position.add(this.velocity);

    // Screen wrapping
    this.wrapPosition();
  }

  wrapPosition() {
    const bounds = 10;
    if (this.mesh.position.x > bounds) this.mesh.position.x = -bounds;
    if (this.mesh.position.x < -bounds) this.mesh.position.x = bounds;
    if (this.mesh.position.y > bounds) this.mesh.position.y = -bounds;
    if (this.mesh.position.y < -bounds) this.mesh.position.y = bounds;
  }

  getPosition(): THREE.Vector3 {
    return this.mesh.position.clone();
  }

  getBoundingRadius(): number {
    return 0.5;
  }
}
