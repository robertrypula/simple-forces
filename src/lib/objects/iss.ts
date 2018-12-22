// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Complex, Point, World } from '..';
import { Earth } from './earth';
import { ObjectCore } from './object-core';

export class Iss extends ObjectCore {
  public static readonly MASS = 419725;
  public static readonly PERIGEE = Earth.RADIUS + 400e3;   // TODO fine-tune perigee
  public static readonly PERIGEE_VELOCITY = 7.66e3;        // TODO fine-tune orbital velocity
  public center: Point;

  public constructor(world: World) {
    super(world);
    this.create();
  }

  public orbitAroundEarthAtOrigin(perigeeDegreeAngle: number): Iss {
    this.translate(Complex.create(Iss.PERIGEE, 0));
    this.center.velocity.y = Iss.PERIGEE_VELOCITY;
    this.rotate(Complex.createPolar(perigeeDegreeAngle / 360));

    return this;
  }

  protected create(): void {
    this.points.push(
      this.center = this.world.createPoint(Complex.create(0, 0), Iss.MASS)
    );

    this.center.name = 'Apollo';
  }
}
