import type { Ship } from '../entities/Ship';
import type { Asteroid } from '../entities/Asteroid';
import * as THREE from 'three';

export class CollisionDetector {
  checkShipAsteroidCollision(ship: Ship, asteroids: Asteroid[]): boolean {
    const shipPos = ship.getPosition();
    const shipRadius = ship.getBoundingRadius();

    for (const asteroid of asteroids) {
      const asteroidPos = asteroid.getPosition();
      const asteroidRadius = asteroid.getBoundingRadius();

      const distance = shipPos.distanceTo(asteroidPos);
      const minDistance = shipRadius + asteroidRadius;

      if (distance < minDistance) {
        return true; // Collision detected
      }
    }

    return false;
  }

  checkCollisions(ship: Ship, asteroids: Asteroid[]): boolean {
    return this.checkShipAsteroidCollision(ship, asteroids);
  }
}
