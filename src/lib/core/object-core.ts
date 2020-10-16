// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Line } from '@core/constraints-hosts/line';
import { Point } from '@core/constraints-hosts/point';
import { World } from '@core/world';

export abstract class ObjectCore {
  public points: Point[] = [];
  public lines: Line[] = [];

  protected constructor(public world: World) {}

  public translate(amount: Complex): ObjectCore {
    this.points.forEach((point: Point): void => {
      point.position.add(amount);
    });

    return this;
  }

  public rotate(amount: Complex): ObjectCore {
    this.points.forEach((point: Point): void => {
      point.position.multiply(amount);
      point.velocity.multiply(amount);
    });

    return this;
  }

  public setIsStatic(isStatic: boolean): ObjectCore {
    this.points.forEach((point: Point): void => {
      point.isStatic = isStatic;
    });

    return this;
  }
}
