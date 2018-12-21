// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Complex, Point, World } from '..';
import { ObjectCore } from './object-core';

// Other planets vectors:
// https://ssd.jpl.nasa.gov/horizons.cgi#results

export class Earth extends ObjectCore {
  public static readonly MASS = 5.97219e24;
  public static readonly RADIUS = 6378100;
  public center: Point;

  public constructor(world: World) {
    super(world);
    this.create();
    this.translate(Complex.create(0, -Earth.RADIUS));
  }

  protected create(): void {
    this.points.push(
      this.center = this.world.createPoint(Complex.create(0, 0), Earth.MASS)
    );

    this.center.name = 'Earth';
    this.center.isStatic = true;
    this.center.createGravityForce();
  }
}
