// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { APOLLO_MASS, APOLLO_PERIGEE_ALTITUDE, APOLLO_PERIGEE_TLI_VELOCITY, EARTH_MEAN_RADIUS } from '@core/constants';
import { Point } from '@core/constraints-hosts/point';
import { ObjectCore } from '@core/object-core';
import { World } from '@core/world';

export class Apollo extends ObjectCore {
  public center: Point;

  public constructor(world: World) {
    super(world);
    this.create();
  }

  public translunarInjectionWithEarthAtOrigin(perigeeDegreeAngle: number): Apollo {
    this.translate(Complex.create(EARTH_MEAN_RADIUS + APOLLO_PERIGEE_ALTITUDE, 0));
    this.center.velocity.y = APOLLO_PERIGEE_TLI_VELOCITY;
    this.rotate(Complex.createPolar(perigeeDegreeAngle / 360));

    return this;
  }

  protected create(): void {
    this.points.push((this.center = this.world.createPoint(Complex.create(0, 0), APOLLO_MASS)));

    this.center.name = 'Apollo';
  }
}
