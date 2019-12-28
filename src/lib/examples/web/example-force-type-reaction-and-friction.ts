// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { Complex, Line, Point } from '@';

import { AbstractExample } from '@examples/web/abstract-example';

export class ExampleForceTypeReactionAndFriction extends AbstractExample {
  public lineA: Line;
  public pointA: Point;

  public createScene(): void {
    this.lineA = this.world.createLine(
      this.world.createPoint(Complex.create(-1, -1), 0.1),
      this.world.createPoint(Complex.create(1, -1), 0.1)
    );
    this.lineA.createReactionAndFrictionForceSource();

    this.pointA = this.world.createPoint(Complex.create(0.9, 0), 0.1, Complex.create(0, -1));
  }

  public timeTick(dt: number): void {
    this.log(this.timeTickWithLog(dt));
  }
}
