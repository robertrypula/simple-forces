// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Force, ForceManager, ForceType } from '@core/force';
import { Point } from '@core/point';
import { World } from '@core/world';

/*tslint:disable:max-classes-per-file*/

export class GravityForce extends Force {
  public static readonly G = 6.674e-11;      // https://en.wikipedia.org/wiki/Gravitational_constant

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
