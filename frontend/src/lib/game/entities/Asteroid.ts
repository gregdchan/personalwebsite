import * as THREE from 'three';

export class Asteroid {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  rotationSpeed: THREE.Vector3;

  constructor(position: THREE.Vector3, color: number = 0xff9933, size: number = 1) {
    // Create octahedron for asteroid
    const geometry = new THREE.OctahedronGeometry(size, 0);
    const material = new THREE.MeshBasicMaterial({
      color,
      wireframe: true
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);

    // Random velocity
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.02 + Math.random() * 0.05;
    this.velocity = new THREE.Vector3(
      Math.cos(angle) * speed,
      Math.sin(angle) * speed,
      0
    );

    // Random rotation
    this.rotationSpeed = new THREE.Vector3(
      (Math.random() - 0.5) * 0.02,
      (Math.random() - 0.5) * 0.02,
      (Math.random() - 0.5) * 0.02
    );
  }

  update() {
    this.mesh.position.add(this.velocity);
    this.mesh.rotation.x += this.rotationSpeed.x;
    this.mesh.rotation.y += this.rotationSpeed.y;
    this.mesh.rotation.z += this.rotationSpeed.z;

    // Screen wrapping
    this.wrapPosition();
  }

  wrapPosition() {
    const bounds = 12;
    if (this.mesh.position.x > bounds) this.mesh.position.x = -bounds;
    if (this.mesh.position.x < -bounds) this.mesh.position.x = bounds;
    if (this.mesh.position.y > bounds) this.mesh.position.y = -bounds;
    if (this.mesh.position.y < -bounds) this.mesh.position.y = bounds;
  }

  getPosition(): THREE.Vector3 {
    return this.mesh.position.clone();
  }

  getBoundingRadius(): number {
    return 1;
  }
}
