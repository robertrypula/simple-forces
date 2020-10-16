// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { Complex, Force, Point } from '@';

import { AbstractEarthSurfaceExample } from '@examples/abstract-example-earth-surface';

export class ExampleForceTypeGravity extends AbstractEarthSurfaceExample {
  public ballLeft: Point;
  public ballMiddle: Point;
  public ballRight: Point;

  public animationFrame(dt: number): void {
    super.animationFrame(dt);
    this.log = [
      ...this.log,
      ['Middle ball position', this.ballMiddle.position.toStringXY()],
      ['Middle ball velocity', this.ballMiddle.velocity.toStringXY()],
      ['Middle ball acceleration', this.ballMiddle.acceleration.toStringXY(3)],
      [
        'Middle ball forces',
        this.ballMiddle.forces.map((force: Force): string => force.vector.toStringXY(3)).join(' | ')
      ]
    ];
  }

  public createScene(): void {
    this.createEarthSurfaceEnvironment();

    this.ballLeft = this.world.createPoint(Complex.create(-1, 0), 0.1);
    this.ballLeft.radius = 3;

    this.ballMiddle = this.world.createPoint(Complex.create(0, 0), 1);
    this.ballMiddle.radius = 3;

    this.ballRight = this.world.createPoint(Complex.create(1, 0), 10);
    this.ballRight.radius = 3;
  }
}
