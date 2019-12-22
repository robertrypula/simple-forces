// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Force, ForceSource, ForceType } from '@core/force';
import { Point } from '@core/point';
import { World } from '@core/world';

/*tslint:disable:max-classes-per-file*/

export class GravityForce extends Force {
  public static readonly G = 6.674e-11; // https://en.wikipedia.org/wiki/Gravitational_constant

  public constructor(public forceSource: GravityForceSource) {
    super(ForceType.Gravity, forceSource);
  }

  public calculateForce(point: Point): void {
    const sourceDirection = this.forceSource.point.position.clone().subtract(point.position);
    const r = sourceDirection.getMagnitude();

    // TODO known issue:
    //  - magnitude of force is calculated twice
    //    (Moon-Earth acts on each other with the same force but opposite direction)

    if (r !== 0) {
      const forceMagnitude = (GravityForce.G * this.forceSource.point.mass * point.mass) / Math.pow(r, 2);
      this.vector = sourceDirection.normalize().multiplyScalar(forceMagnitude);
    } else {
      this.vector = Complex.create();
    }
  }
}

// ----------------------------------------------------------------

export class GravityForceSource extends ForceSource {
  public constructor(world: World, public point: Point) {
    super(world);
    // remember to call refreshGravityAwareness after adding all objects to the world
  }

  public refreshAwareness(): void {
    this.forEachWorldPointNotYetAwareAboutTheSource((point: Point): void => {
      point.forces.push(new GravityForce(this));
    });
  }
}
