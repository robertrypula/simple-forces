// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Angle } from '@core/constraints-hosts/angle';
import { Point } from '@core/constraints-hosts/point';
import { Force, ForceSource } from '@core/force';
import { ForceType } from '@core/models';
import { World } from '@core/world';

/*tslint:disable:max-classes-per-file*/

export class JointAndTorqueForce extends Force {
  public constructor(public forceSource: JointAndTorqueForceSource) {
    super(ForceType.JointAndTorque, forceSource);
  }

  public calculateForce(point: Point): void {
    // TODO implement
  }
}

// ----------------------------------------------------------------

export class JointAndTorqueForceSource extends ForceSource {
  public constructor(world: World, public angle: Angle) {
    super(world);

    // TODO implement

    // NOTE: no world's refreshAwareness method is needed - joint & torque force interacts only with three 'self' points
  }
}
