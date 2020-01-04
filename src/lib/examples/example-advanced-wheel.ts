// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { Complex, Line, Wheel } from '@';

import { AbstractEarthSurfaceExample } from '@examples/abstract-example-earth-surface';

export class ExampleAdvancedWheel extends AbstractEarthSurfaceExample {
  public lineA: Line;
  public lineLeft: Line;
  public wheel: Wheel;

  public createScene(): void {
    this.createEarthSurfaceEnvironment();

    this.wheel = new Wheel(this.world);
    this.wheel.translate(Complex.create(2, 3));

    this.lineA = this.world.createLine(
      this.world.createPoint(Complex.create(-1, -0.5)),
      this.world.createPoint(Complex.create(5, 1.0))
    );
    this.lineA.setIsStatic(true);
    this.lineA.createReactionAndFrictionForceSource();

    this.lineLeft = this.world.createLine(
      this.world.createPoint(Complex.create(-5, 2)),
      this.world.createPoint(Complex.create(-5, -1))
    );
    this.lineLeft.setIsStatic(true);
    this.lineLeft.createReactionAndFrictionForceSource();

    // this.world.physics.timeWarp = 0.2;
  }
}
