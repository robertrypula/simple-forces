// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Complex, Point, World } from '..';
import { ObjectCore } from './object-core';

// Other planets vectors:
// https://ssd.jpl.nasa.gov/horizons.cgi

export class Earth extends ObjectCore {
  public static readonly MASS = 5.97219e24;     // https://en.wikipedia.org/wiki/Earth_mass
  public static readonly RADIUS = 6371e3;       // https://en.wikipedia.org/wiki/Earth_radius
  public center: Point;

  public constructor(world: World) {
    super(world);
    this.create();
  }

  protected create(): void {
    this.points.push(
      this.center = this.world.createPoint(Complex.create(0, 0), Earth.MASS)
    );

    this.center.name = 'Moon';
    this.center.isStatic = true;
    this.center.radius = Earth.RADIUS;
    this.center.createGravityForce();
  }
}
