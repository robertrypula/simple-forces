// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { EARTH_MASS, EARTH_MEAN_RADIUS } from '@core/constants';
import { ObjectCore } from '@core/object-core';
import { Point } from '@core/point';
import { World } from '@core/world';

export class Earth extends ObjectCore {
  public center: Point;

  public constructor(world: World) {
    super(world);
    this.create();
  }

  protected create(): void {
    this.points.push((this.center = this.world.createPoint(Complex.create(0, 0), EARTH_MASS)));

    this.center.name = 'Earth';
    this.center.isStatic = true;
    this.center.radius = EARTH_MEAN_RADIUS;
    this.center.createGravityForceSource();
  }
}
