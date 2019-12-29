// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { MOON_MASS, MOON_MEAN_RADIUS, MOON_PERIGEE_ALTITUDE, MOON_PERIGEE_VELOCITY } from '@core/constants';
import { Point } from '@core/constraints/point';
import { ObjectCore } from '@core/object-core';
import { World } from '@core/world';
import { RadiusType } from '@core/models';

export class Moon extends ObjectCore {
  public center: Point;

  public constructor(world: World) {
    super(world);
    this.create();
  }

  public orbitAroundEarthAtOrigin(perigeeDegreeAngle: number): Moon {
    this.translate(Complex.create(MOON_PERIGEE_ALTITUDE, 0));
    this.center.velocity.y = MOON_PERIGEE_VELOCITY;
    this.center.isStatic = false;
    this.rotate(Complex.createPolar(perigeeDegreeAngle / 360));

    return this;
  }

  protected create(): void {
    this.points.push((this.center = this.world.createPoint(Complex.create(0, 0), MOON_MASS)));

    this.center.name = 'Moon';
    this.center.isStatic = true;
    this.center.radius = MOON_MEAN_RADIUS;
    this.center.radiusType = RadiusType.Real;
    this.center.createGravityForceSource();
  }
}
