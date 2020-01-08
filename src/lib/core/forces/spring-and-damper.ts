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
    const springForce: number = -(simplePointLineB.position.x - line.length) * this.forceSource.k;
    const dampingForce: number = -simplePointLineB.velocity.x * this.forceSource.b;
    const finalForce: number = (springForce + dampingForce) * (this.forceSource.includeMass ? point.mass : 1);

    simplePointLineB.force = Complex.create(finalForce, 0);
    this.forceSource.pointBForce.vector = simplePointLineB.transformBackOnlyForce(origin, unitAngle).force;
    this.vector = simplePointLineB.force.clone().multiplyScalar(-1);
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
