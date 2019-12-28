// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex, Line, Point } from '@'; // in your code it would be: ... from 'simple-forces'
import { ExampleCore } from '@examples/web/example-core';

export class Example005 extends ExampleCore {
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
