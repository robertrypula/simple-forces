// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { Complex, Line } from '@';

import { AbstractEarthSurfaceExample } from '@examples/abstract-example-earth-surface';

export class ExampleForceTypeLiftAndDrag extends AbstractEarthSurfaceExample {
  public wingHorizontal: Line;
  public wingVertical: Line;

  public createScene(): void {
    this.createEarthSurfaceEnvironment();

    this.wingHorizontal = this.world.createLine(
      this.world.createPoint(Complex.create(-4, 0), 0.1, Complex.create(1, 0)),
      this.world.createPoint(Complex.create(-3, 0), 0.1, Complex.create(1, 0))
    );
    this.wingHorizontal.createSpringAndDamperForceSource();

    this.wingVertical = this.world.createLine(
      this.world.createPoint(Complex.create(0, 1), 0.1, Complex.create(1, 0)),
      this.world.createPoint(Complex.create(0, 0), 0.1, Complex.create(1, 0))
    );
    this.wingVertical.createSpringAndDamperForceSource();

    this.earth.center.createLiftAndDragForceSource();
  }
}
