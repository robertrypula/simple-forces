// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';

export class SimplePoint {
  public force: Complex;

  public constructor(public position: Complex, public velocity: Complex) {}

  public transform(origin: SimplePoint, unitAngle: number, withVelocity = true): SimplePoint {
    const rotation = Complex.createPolar(-unitAngle);

    this.position.subtract(origin.position).multiply(rotation);
    withVelocity && this.velocity.subtract(origin.velocity).multiply(rotation);

    return this;
  }

  public transformBackOnlyForce(unitAngle: number): SimplePoint {
    this.force.multiply(Complex.createPolar(unitAngle));

    return this;
  }
}
