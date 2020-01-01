// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { Complex, Line, Point } from '@';

import { AbstractExample } from '@examples/abstract-example';

export class ExampleForceTypeReactionAndFriction extends AbstractExample {
  public lineA: Line;
  public pointA: Point;

  public createScene(): void {
    this.lineA = this.world.createLine(
      this.world.createPoint(Complex.create(-3, -0.5), 0.5),
      this.world.createPoint(Complex.create(3, -0.5), 0.5)
    );
    this.lineA.createReactionAndFrictionForceSource();
    this.lineA.createSpringAndDamperForceSource();

    this.pointA = this.world.createPoint(Complex.create(-2, 1), 0.5, Complex.create(1.5, -0.5));
    this.pointA.radius = 3;
  }
}
