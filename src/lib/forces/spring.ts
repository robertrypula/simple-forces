// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Complex, Force, ForceManager, ForceType, Line, Point, World } from '..';

/*tslint:disable:max-classes-per-file*/

export class SpringForce extends Force {
  public constructor(
    public line: Line,
    public forceManager: SpringForceManager
  ) {
    super(ForceType.Spring, forceManager);
  }

  public calculateForce(point: Point): void {
    const springMountingPoint: Point = this.line.pointA === point
      ? this.line.pointB
      : this.line.pointA;
    const direction: Complex = point.position.clone().subtract(springMountingPoint.position);
    const velocity: Complex = point.velocity.clone().subtract(springMountingPoint.velocity);
    const x: number = direction.getMagnitude() - this.line.length;
    const v = velocity.multiply(Complex.createPolar(-direction.getUnitAngle())).x;

    this.vector = direction
      .normalize()
      .multiplyScalar(-x * this.forceManager.k - v * this.forceManager.b);
  }
}

// ----------------------------------------------------------------

export class SpringForceManager extends ForceManager {
  public k: number = 12.1;
  public b: number = 12.1;

  public constructor(
    world: World,
    public line: Line
  ) {
    super(world);
    line.pointA.forces.push(new SpringForce(line, this));
    line.pointB.forces.push(new SpringForce(line, this));
  }
}
