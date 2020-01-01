// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { Complex, Point } from '@';

import { AbstractEarthSurfaceExample } from '@examples/abstract-example-earth-surface';

export class ExampleForceTypeGravity extends AbstractEarthSurfaceExample {
  public ballA: Point;
  public ballB: Point;
  public ballC: Point;

  public animationFrame(dt: number): void {
    super.animationFrame(dt);
    this.log = [
      ...this.log,
      ['Ball A position', this.ballA.position.toStringXY()],
      ['Ball A velocity', this.ballA.velocity.toStringXY()],
      ['Ball A acceleration', this.ballA.acceleration.toStringXY(3)],
      ['Ball A force', this.ballA.forces.map(force => force.vector.toStringXY(3)).join(' | ')]
    ];
  }

  public createScene(): void {
    this.createEarthSurfaceEnvironment();

    this.ballA = this.world.createPoint(Complex.create(-1, 0), 0.1);
    this.ballA.radius = 2;

    this.ballB = this.world.createPoint(Complex.create(0, 0), 1);
    this.ballB.radius = 2;

    this.ballC = this.world.createPoint(Complex.create(1, 0), 10);
    this.ballC.radius = 2;
  }
}
