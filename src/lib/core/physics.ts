// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Point } from '@core/constraints/point';

export class Physics {
  public internalSteps = 100;
  public time = 0;
  public timeWarp = 1;

  public constructor(protected points: Point[]) {}

  public calculate(dt: number): void {
    let firstStaticPointIndex: number;

    dt *= this.timeWarp;
    this.time += dt;

    this.points.sort((a: Point, b: Point): number => (a.isStatic === b.isStatic ? 0 : a.isStatic ? 1 : -1));
    firstStaticPointIndex = this.points.findIndex(a => a.isStatic);
    firstStaticPointIndex = firstStaticPointIndex === -1 ? this.points.length : firstStaticPointIndex;

    for (let i = 0; i < this.internalSteps; i++) {
      this.calculateInternal(dt / this.internalSteps, firstStaticPointIndex);
    }
  }

  protected calculateInternal(dt: number, firstStaticPointIndex: number): void {
    let point: Point;

    for (let i = 0; i < firstStaticPointIndex; i++) {
      point = this.points[i];

      if (!point.isStatic) {
        for (let j = 0; j < point.forces.length; j++) {
          point.forces[j].calculateForce(point, dt);
        }
      }
    }

    for (let i = 0; i < firstStaticPointIndex; i++) {
      point = this.points[i];

      if (!point.isStatic) {
        point.force.reset();
        for (let j = 0; j < point.forces.length; j++) {
          point.force.add(point.forces[j].vector);
        }
        point.acceleration = point.force.clone().divideScalar(point.mass);

        // TODO double check formulas with 'Velocity Verlet' (probably velocity is calculated incorrectly)
        // https://en.wikipedia.org/wiki/Verlet_integration
        point.position
          .add(point.velocity.clone().multiplyScalar(dt))
          .add(point.acceleration.clone().multiplyScalar((dt * dt) / 2));
        point.velocity.add(point.acceleration.clone().multiplyScalar(dt));
      }
    }
  }
}
