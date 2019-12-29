// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Line } from '@core/constraints/line';
import { Point } from '@core/constraints/point';
import { Force, ForceSource } from '@core/force';
import { ForceType } from '@core/models';
import { World } from '@core/world';

/*tslint:disable:max-classes-per-file*/

export class SpringAndDamperForce extends Force {
  public constructor(public forceSource: SpringAndDamperForceSource) {
    super(ForceType.SpringAndDamper, forceSource);
  }

  public calculateForce(point: Point): void {
    const springMountingPoint: Point =
      this.forceSource.line.pointA === point ? this.forceSource.line.pointB : this.forceSource.line.pointA;
    const direction: Complex = point.position.clone().subtract(springMountingPoint.position);
    const velocity: Complex = point.velocity.clone().subtract(springMountingPoint.velocity);
    const x: number = direction.getMagnitude() - this.forceSource.line.length;
    const v = velocity.multiply(Complex.createPolar(-direction.getUnitAngle())).x;

    // TODO known issue:
    //  - magnitude of force is calculated twice
    //    (ends of the spring acts on each other with the same force but opposite direction)
    //    solution: ignore the second end of the line and calculate everything in the first end

    this.vector = direction.normalize().multiplyScalar(-x * this.forceSource.k - v * this.forceSource.b);
  }
}

// ----------------------------------------------------------------

export class SpringAndDamperForceSource extends ForceSource {
  public k: number = 200;
  public b: number = 1;

  public constructor(world: World, public line: Line) {
    super(world);

    line.pointA.forces.push(new SpringAndDamperForce(this));
    line.pointB.forces.push(new SpringAndDamperForce(this));

    // NOTE: no world's refreshAwareness method is needed - spring & damper force interacts only with two 'self' points
  }
}
