// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Complex, Point, World } from '..';
import { ObjectCore } from './object-core';

// Other planets vectors:
// https://ssd.jpl.nasa.gov/horizons.cgi

export class Moon extends ObjectCore {
  public static readonly MASS = 7.34767309e22;
  public static readonly RADIUS = 1737e3;
  public static readonly PERIGEE = 362.6e6;
  public static readonly PERIGEE_VELOCITY = 1077.2;  // TODO fine-tune orbital velocity
  public center: Point;

  public constructor(world: World) {
    super(world);
    this.create();
  }

  public orbitAroundEarthAtOrigin(perigeeDegreeAngle: number): Moon {
    this.translate(Complex.create(Moon.PERIGEE, 0));
    this.center.velocity.y = Moon.PERIGEE_VELOCITY;
    this.center.isStatic = false;
    this.rotate(Complex.createPolar(perigeeDegreeAngle / 360));

    return this;
  }

  protected create(): void {
    this.points.push(
      this.center = this.world.createPoint(Complex.create(0, 0), Moon.MASS)
    );

    this.center.name = 'Moon';
    this.center.isStatic = true;
    this.center.radius = Moon.RADIUS;
    this.center.createGravityForce();
  }
}
