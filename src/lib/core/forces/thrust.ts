// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Force, ForceSource, ForceType } from '@core/force';
import { Line } from '@core/line';
import { Point } from '@core/point';
import { World } from '@core/world';

/*tslint:disable:max-classes-per-file*/

export class ThrustForce extends Force {
  public constructor(public forceSource: ThrustForceSource) {
    super(ForceType.Thrust, forceSource);
  }

  public calculateForce(point: Point): void {
    this.vector = this.forceSource.localVector
      .clone()
      .multiply(Complex.createPolar(this.forceSource.line.getUnitAngle()));
  }
}

// ----------------------------------------------------------------

export class ThrustForceSource extends ForceSource {
  public localVector = Complex.create();

  public constructor(world: World, public line: Line) {
    super(world);
    line.pointA.forces.push(new ThrustForce(this));
    line.pointB.forces.push(new ThrustForce(this));
    // thrust force interacts only with two 'self' points - no refreshAwareness method is needed
  }
}
