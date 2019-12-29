// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { Complex, Line } from '@';

import { AbstractExample } from '@examples/abstract-example';

export class ExampleForceTypeThrust extends AbstractExample {
  public line: Line;

  public createScene(): void {
    this.line = this.world.createLine(
      this.world.createPoint(Complex.create(-1, 0)),
      this.world.createPoint(Complex.create(1, 0))
    );

    this.line.createThrustForceSource();
  }
}
