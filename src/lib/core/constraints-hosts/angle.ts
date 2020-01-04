// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

import { Line } from '@core/constraints-hosts/line';
import { JointAndTorqueForceSource } from '@core/forces/joint-and-torque';
import { World } from '@core/world';

export class Angle {
  public angle: number;
  public name: string;

  public jointAndTorqueForceSource: JointAndTorqueForceSource;

  public constructor(public world: World, public lineA: Line, public lineB: Line) {}

  public createJointAndTorqueForceSource(): Angle {
    this.jointAndTorqueForceSource = new JointAndTorqueForceSource(this.world, this);

    return this;
  }
}
