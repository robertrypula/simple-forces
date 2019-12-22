// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex, Point, World } from '..';
import { Earth } from './earth';
import { ObjectCore } from './object-core';

export class Apollo extends ObjectCore {
  // https://en.wikipedia.org/wiki/Apollo_8
  // TODO fine-tune perigee
  // TODO fine-tune orbital velocity: wiki says about 7.793e3 & 10.822e3
  public static readonly MASS = 28870 + 5621 + 23250;
  public static readonly PERIGEE = Earth.RADIUS + 184.4e3;
  public static readonly PERIGEE_VELOCITY = 7.793e3;
  public static readonly PERIGEE_TLI_VELOCITY = 10.944605e3;   // 9448
  public center: Point;

  public constructor(world: World) {
    super(world);
    this.create();
  }

  public translunarInjectionWithEarthAtOrigin(perigeeDegreeAngle: number): Apollo {
    this.translate(Complex.create(Apollo.PERIGEE, 0));
    this.center.velocity.y = Apollo.PERIGEE_TLI_VELOCITY;
    this.rotate(Complex.createPolar(perigeeDegreeAngle / 360));

    return this;
  }

  protected create(): void {
    this.points.push(
      this.center = this.world.createPoint(Complex.create(0, 0), Apollo.MASS)
    );

    this.center.name = 'Apollo';
  }
}
