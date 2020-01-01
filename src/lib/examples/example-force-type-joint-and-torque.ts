// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { Angle, Complex, Point } from '@';

import { AbstractEarthSurfaceExample } from '@examples/abstract-example-earth-surface';

export class ExampleForceTypeJointAndTorque extends AbstractEarthSurfaceExample {
  public angleA: Angle;
  public middlePoint: Point;

  public createScene(): void {
    this.createEarthSurfaceEnvironment();

    this.middlePoint = this.world.createPoint(Complex.create(0.5, 0), 0.1);

    this.angleA = this.world.createAngle(
      this.world.createLine(this.middlePoint, this.world.createPoint(Complex.create(1, 1), 0.1)),
      this.world.createLine(this.middlePoint, this.world.createPoint(Complex.create(-1, 1), 0.1))
    );

    this.angleA.createJointAndTorqueForceSource();
    this.angleA.lineA.createSpringAndDamperForceSource();
    this.angleA.lineB.createSpringAndDamperForceSource();

    this.middlePoint.radius = 3;
    this.angleA.lineA.pointB.radius = 3;
    this.angleA.lineB.pointB.radius = 3;
  }
}
