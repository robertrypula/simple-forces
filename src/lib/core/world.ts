// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Angle } from '@core/constraints-hosts/angle';
import { Line } from '@core/constraints-hosts/line';
import { Point } from '@core/constraints-hosts/point';
import { Physics } from '@core/physics';
import { Viewport } from '@core/viewport';

export class World {
  public angles: Angle[] = [];
  public lines: Line[] = [];
  public points: Point[] = [];

  public physics: Physics;
  public viewport: Viewport;

  public constructor() {
    this.viewport = new Viewport(this.points);
    this.physics = new Physics(this.points);
  }

  public animationFrame(dt: number): void {
    this.physics.calculate(dt);
    this.viewport.calculate();
  }

  public createAngle(lineA: Line, lineB: Line): Angle {
    const angle = new Angle(this, lineA, lineB);

    this.angles.push(angle);

    return angle;
  }

  public createLine(pointA: Point, pointB: Point): Line {
    const line = new Line(this, pointA, pointB);

    this.lines.push(line);

    return line;
  }

  public createPoint(position?: Complex, mass?: number, velocity?: Complex): Point {
    const point = new Point(this, position, mass, velocity);

    this.points.push(point);

    return point;
  }

  public refreshAwareness(): void {
    this.refreshDragAwareness();
    this.refreshGravityAwareness();
    this.refreshLiftAndDragAwareness();
    this.refreshReactionAndFrictionAwareness();
  }

  public refreshDragAwareness(): void {
    this.points
      .filter((point: Point) => point.dragForceSource)
      .forEach((point: Point) => point.dragForceSource.refreshAwareness());
  }

  public refreshGravityAwareness(): void {
    this.points
      .filter((point: Point) => point.gravityForceSource)
      .forEach((point: Point) => point.gravityForceSource.refreshAwareness());
  }

  public refreshLiftAndDragAwareness(): void {
    this.points
      .filter((point: Point) => point.liftAndDragForceSource)
      .forEach((point: Point) => point.liftAndDragForceSource.refreshAwareness());
  }

  public refreshReactionAndFrictionAwareness(): void {
    this.lines
      .filter((line: Line) => line.reactionAndFrictionForceSource)
      .forEach((line: Line) => line.reactionAndFrictionForceSource.refreshAwareness());
  }
}
