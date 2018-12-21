// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Complex, Line, Point, World } from '..';

export abstract class ObjectCore {
  public points: Point[] = [];
  public lines: Line[] = [];

  protected constructor(
    public world: World
  ) {}

  public translate(v: Complex): void {
    this.points.forEach((point: Point) => {
      point.position.add(v);
    });
  }

  public updateStaticFlagInAllPoints(isStatic: boolean): void {
    this.points.forEach((point: Point) => {
      point.isStatic = isStatic;
    });
  }
}
