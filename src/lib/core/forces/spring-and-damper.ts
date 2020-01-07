// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { DEFAULT_SPRING_AND_DAMPER_B_COEFFICIENT, DEFAULT_SPRING_AND_DAMPER_K_COEFFICIENT } from '@core/constants';
import { Line } from '@core/constraints-hosts/line';
import { Point } from '@core/constraints-hosts/point';
import { Force, ForceSource } from '@core/force';
import { ForceType } from '@core/models';
import { SimplePoint } from '@core/simple-point';
import { World } from '@core/world';

/*tslint:disable:max-classes-per-file*/

export class SpringAndDamperForce extends Force {
  public constructor(public forceSource: SpringAndDamperForceSource) {
    super(ForceType.SpringAndDamper, forceSource);
  }

  public calculateForce(point: Point): void {
    if (this.isSecondEnd(point)) {
      return;
    }

    const line: Line = this.forceSource.line;
    const unitAngle: number = line.getUnitAngle();
    const origin: SimplePoint = line.pointA.cloneAsSimplePoint();
    const simplePointLineB: SimplePoint = line.pointB.cloneAsSimplePoint().transform(origin, unitAngle);

    const springForce: number = -(line.length - simplePointLineB.position.x) * this.forceSource.k;
    const dampingForce: number = simplePointLineB.velocity.x * this.forceSource.b;
    let finalForce: number = springForce + dampingForce;

    this.forceSource.includeMass && (finalForce *= point.mass);

    simplePointLineB.force = Complex.create(finalForce, 0);
    this.vector = simplePointLineB.transformBack(origin, unitAngle).force;
    this.forceSource.pointBForce.vector = simplePointLineB.force.clone().multiplyScalar(-1);

    /*
    const springMountingPoint: Point =
      this.forceSource.line.pointA === point ? this.forceSource.line.pointB : this.forceSource.line.pointA;
    const direction: Complex = point.position.clone().subtract(springMountingPoint.position);
    const velocity: Complex = point.velocity.clone().subtract(springMountingPoint.velocity);
    const x: number = direction.getMagnitude() - this.forceSource.line.length;
    const v: number = velocity.multiply(Complex.createPolar(-direction.getUnitAngle())).x;
    const springForce: number = x * this.forceSource.k;
    const dampingForce: number = v * this.forceSource.b;
    let finalForce: number = springForce + dampingForce;

    this.forceSource.includeMass && (finalForce *= point.mass);

    this.vector = direction.normalize().multiplyScalar(-finalForce);
    */
    // TODO known issue:
    //  - magnitude of force is calculated twice
    //    (ends of the spring acts on each other with the same force but opposite direction)
    //    solution: ignore the second end of the line and calculate everything in the first end
  }

  protected isSecondEnd(point: Point): boolean {
    return point === this.forceSource.line.pointB;
  }
}

// ----------------------------------------------------------------

export class SpringAndDamperForceSource extends ForceSource {
  public b: number = DEFAULT_SPRING_AND_DAMPER_B_COEFFICIENT;
  public k: number = DEFAULT_SPRING_AND_DAMPER_K_COEFFICIENT;
  public includeMass = true; // TODO move to constants

  // NOTE: caching references to force speeds up access to it as each
  // point have array of forces and we would need to use slower find()
  public pointBForce: SpringAndDamperForce;

  public constructor(world: World, public line: Line) {
    super(world);

    line.pointA.forces.push(new SpringAndDamperForce(this));
    line.pointB.forces.push((this.pointBForce = new SpringAndDamperForce(this)));

    // NOTE: no world's refreshAwareness method is needed - spring & damper force interacts only with two 'self' points
  }
}
