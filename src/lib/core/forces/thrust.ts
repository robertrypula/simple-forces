// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Force, ForceManager, ForceType } from '@core/force';
import { Line } from '@core/line';
import { Point } from '@core/point';
import { World } from '@core/world';

/*tslint:disable:max-classes-per-file*/

export class ThrustForce extends Force {
  public constructor(public line: Line, public forceManager: ThrustForceManager) {
    super(ForceType.Thrust, forceManager);
  }

  public calculateForce(point: Point): void {
    this.vector = this.forceManager.localVector.clone().multiply(Complex.createPolar(this.line.getUnitAngle()));
  }
}

// ----------------------------------------------------------------

export class ThrustForceManager extends ForceManager {
  public localVector = Complex.create();

  public constructor(world: World, public line: Line) {
    super(world);
    line.pointA.forces.push(new ThrustForce(line, this));
    line.pointB.forces.push(new ThrustForce(line, this));
  }
}
