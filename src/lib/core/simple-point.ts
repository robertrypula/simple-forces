// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Complex } from './complex';

export class SimplePoint {
  public constructor(
    public position: Complex,
    public velocity: Complex,
    public force: Complex = Complex.create()
  ) {}

  public transform(origin: SimplePoint, unitAngle: number): SimplePoint {
    const rotation = Complex.createPolar(-unitAngle);

    this.position.subtract(origin.position).multiply(rotation);
    this.velocity.subtract(origin.velocity).multiply(rotation);

    return this;
  }

  public transformBack(origin: SimplePoint, unitAngle: number): SimplePoint {
    const rotation = Complex.createPolar(unitAngle);

    this.position.multiply(rotation).add(origin.position);
    this.velocity.multiply(rotation).add(origin.velocity);
    this.force.multiply(rotation);

    return this;
  }
}
