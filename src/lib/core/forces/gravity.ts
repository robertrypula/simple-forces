// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { GRAVITATIONAL_CONSTANT } from '@core/constants';
import { Point } from '@core/constraints-hosts/point';
import { Force, ForceSource } from '@core/force';
import { ForceType } from '@core/models';
import { World } from '@core/world';

/*tslint:disable:max-classes-per-file*/

export class GravityForce extends Force {
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
      const forceMagnitude = (this.forceSource.G * this.forceSource.point.mass * point.mass) / Math.pow(r, 2);
      this.vector = sourceDirection.normalize().multiplyScalar(forceMagnitude);
    } else {
      this.vector.reset();
    }
  }
}

// ----------------------------------------------------------------

export class GravityForceSource extends ForceSource {
  public G = GRAVITATIONAL_CONSTANT;

  public constructor(world: World, public point: Point) {
    super(world);

    // IMPORTANT: call world.refreshGravityAwareness or world.refreshAwareness when the scene is ready
  }

  public refreshAwareness(): void {
    this.forEachWorldPointNotYetAwareAboutTheSource((point: Point): void => {
      point.forces.push(new GravityForce(this));
    });
  }
}
