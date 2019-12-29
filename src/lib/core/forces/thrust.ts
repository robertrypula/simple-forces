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

    // NOTE: no world's refreshAwareness method is needed - thrust force interacts only with two 'self' points
  }
}
