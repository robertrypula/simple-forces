// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Line } from './line';
import { World } from './world';

export class Angle {
  public angle: number;

  public constructor(
    public world: World,
    public lineA: Line,
    public lineB: Line
  ) { }
}
