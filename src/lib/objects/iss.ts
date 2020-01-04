// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import {
  EARTH_MEAN_RADIUS,
  INTERNATIONAL_SPACE_STATION_MASS,
  INTERNATIONAL_SPACE_STATION_PERIGEE_ALTITUDE,
  INTERNATIONAL_SPACE_STATION_PERIGEE_VELOCITY
} from '@core/constants';
import { Point } from '@core/constraints-hosts/point';
import { ObjectCore } from '@core/object-core';
import { World } from '@core/world';

export class Iss extends ObjectCore {
  public center: Point;

  public constructor(world: World) {
    super(world);
    this.create();
  }

  public orbitAroundEarthAtOrigin(perigeeDegreeAngle: number): Iss {
    this.translate(Complex.create(EARTH_MEAN_RADIUS + INTERNATIONAL_SPACE_STATION_PERIGEE_ALTITUDE, 0));
    this.center.velocity.y = INTERNATIONAL_SPACE_STATION_PERIGEE_VELOCITY;
    this.rotate(Complex.createPolar(perigeeDegreeAngle / 360));

    return this;
  }

  protected create(): void {
    this.points.push((this.center = this.world.createPoint(Complex.create(0, 0), INTERNATIONAL_SPACE_STATION_MASS)));

    this.center.name = 'Iss';
  }
}
