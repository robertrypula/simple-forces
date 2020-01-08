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
    if (this.isOwnGravitySource(point)) {
      return;
    }

    const sourceDirection: Complex = this.forceSource.point.position.clone().subtract(point.position);
    const r: number = sourceDirection.getMagnitude();

    // TODO known issue:
    //  - magnitude of force is calculated twice
    //    (Moon-Earth acts on each other with the same force but opposite direction)
    //    NOTE: not an issue when there is only one gravity source

    const gravityForce: number = (this.forceSource.standardGravitationalParameter * point.mass) / Math.pow(r, 2);
    this.vector = sourceDirection.normalize().multiplyScalar(gravityForce);

    /*
    // alternative solution as accurate as original - unfortunately slower (3.0 seconds vs 3.5 seconds)

    const unitAngle: number = point.position.clone().subtract(this.forceSource.point.position).getUnitAngle();
    const origin: SimplePoint = this.forceSource.point.cloneAsSimplePoint();
    const simplePoint: SimplePoint = point.cloneAsSimplePoint().transform(origin, unitAngle, false);
    const gravityForce: number =
      (this.forceSource.standardGravitationalParameter * point.mass) / Math.pow(simplePoint.position.x, 2);

    simplePoint.force = Complex.create(-gravityForce, 0);
    this.vector = simplePoint.transformBackOnlyForce(unitAngle).force;
    */
  }

  protected isOwnGravitySource(point: Point): boolean {
    return point === this.forceSource.point;
  }
}

// ----------------------------------------------------------------

export class GravityForceSource extends ForceSource {
  public g = GRAVITATIONAL_CONSTANT;
  public standardGravitationalParameter: number; // https://en.wikipedia.org/wiki/Standard_gravitational_parameter

  public constructor(world: World, public point: Point) {
    super(world);

    this.standardGravitationalParameter = this.g * point.mass;

    // IMPORTANT: call world.refreshGravityAwareness or world.refreshAwareness when the scene is ready
  }

  public refreshAwareness(): void {
    this.forEachWorldPointNotYetAwareAboutTheSource((point: Point): void => {
      point.forces.push(new GravityForce(this));
    });
  }
}
