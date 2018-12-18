// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Complex, Force, ForceManager, ForceType, Point, World } from '..';

/*tslint:disable:max-classes-per-file*/

export class GravityForce extends Force {
  public static readonly G = 6.674e-11;

  public constructor(
    public point: Point,
    public forceManager: GravityForceManager
  ) {
    super(ForceType.Gravity, forceManager);
  }

  public calculateForce(point: Point): void {
    const sourceDirection = this.point.position.clone().subtract(point.position);
    const r = sourceDirection.getMagnitude();

    if (r !== 0) {
      const forceMagnitude = (GravityForce.G * this.point.mass * point.mass) / Math.pow(r, 2);
      this.vector = sourceDirection.normalize().multiplyScalar(forceMagnitude);
    } else {
      this.vector = Complex.create();
    }
  }
}

// ----------------------------------------------------------------

export class GravityForceManager extends ForceManager {
  public constructor(
    world: World,
    public point: Point
  ) {
    super(world);
  }

  public refreshAwareness(): void {
    this.forEachWorldPoint((point: Point, isNotAware: boolean) => {
      if (isNotAware) {
        point.forces.push(new GravityForce(this.point, this));
      }
    });
  }
}
