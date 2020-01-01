// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Line } from '@core/constraints/line';
import { Point } from '@core/constraints/point';
import { Force, ForceSource } from '@core/force';
import { ForceType } from '@core/models';
import { World } from '@core/world';

/*tslint:disable:max-classes-per-file*/

export class ThrustForce extends Force {
  public constructor(public forceSource: ThrustForceSource) {
    super(ForceType.Thrust, forceSource);
  }

  public calculateForce(point: Point): void {
    if (this.isEndOfLine(point)) {
      return;
    }

    if (this.forceSource.pointAForce !== this) {
      throw new Error('Problem to investigate'); // TODO remove it after tests on more complex objects with thrust
    }

    this.vector = this.forceSource.localVectorA
      .clone()
      .multiply(Complex.createPolar(this.forceSource.line.getUnitAngle()));

    this.forceSource.pointBForce.vector = this.forceSource.localVectorB
      .clone()
      .multiply(Complex.createPolar(this.forceSource.line.getUnitAngle()));
  }

  protected isEndOfLine(point: Point): boolean {
    return this.forceSource.line.pointB === point;
  }
}

// ----------------------------------------------------------------

export class ThrustForceSource extends ForceSource {
  public localVectorA = Complex.create();
  public localVectorB = Complex.create();
  public pointAForce: ThrustForce; // NOTE: caching references to force speeds up access to it as each
  public pointBForce: ThrustForce; // point have array of forces and we would need to use slower find()

  public constructor(world: World, public line: Line) {
    super(world);

    line.pointA.forces.push((this.pointAForce = new ThrustForce(this)));
    line.pointB.forces.push((this.pointBForce = new ThrustForce(this)));

    // NOTE: no world's refreshAwareness method is needed - thrust force interacts only with two 'self' points
  }
}
