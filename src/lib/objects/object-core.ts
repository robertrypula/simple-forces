// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Complex, Line, Point, World } from '..';

export abstract class ObjectCore {
  public points: Point[] = [];
  public lines: Line[] = [];

  protected constructor(
    public world: World
  ) { }

  public translate(amount: Complex): ObjectCore {
    this.points.forEach((point: Point) => {
      point.position.add(amount);
    });

    return this;
  }

  public rotate(amount: Complex): ObjectCore {
    this.points.forEach((point: Point) => {
      point.position.multiply(amount);
      point.velocity.multiply(amount);
    });

    return this;
  }

  public setIsStatic(isStatic: boolean): ObjectCore {
    this.points.forEach((point: Point) => {
      point.isStatic = isStatic;
    });

    return this;
  }
}
