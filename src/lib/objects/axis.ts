// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Line } from '@core/line';
import { Point } from '@core/point';
import { World } from '@core/world';
import { ObjectCore } from '@objects/object-core';

export class Axis extends ObjectCore {
  public origin: Point;
  public axisX: Point;
  public axisY: Point;
  public axisXLine: Line;
  public axisYLine: Line;

  public constructor(world: World) {
    super(world);
    this.create();
  }

  protected create(): void {
    this.points.push(
      this.origin = this.world.createPoint(),
      this.axisX = this.world.createPoint(Complex.create(1.0, 0.0)),
      this.axisY = this.world.createPoint(Complex.create(0.0, 1.0))
    );
    this.origin.name = 'Axis origin';
    this.axisX.name = 'Axis X';
    this.axisY.name = 'Axis Y';
    this.setIsStatic(true);

    this.lines.push(
      this.axisXLine = this.world.createLine(this.origin, this.axisX),
      this.axisYLine = this.world.createLine(this.origin, this.axisY)
    );
    this.axisXLine.name = 'Axis X line';
    this.axisYLine.name = 'Axis Y line';
  }
}
