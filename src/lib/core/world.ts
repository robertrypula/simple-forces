// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Angle } from '@core/angle';
import { Complex } from '@core/complex';
import { Force } from '@core/force';
import { Line } from '@core/line';
import { Point } from '@core/point';

export class World {
  public points: Point[] = [];
  public lines: Line[] = [];
  public angles: Angle[] = [];

  public timeWarp: number = 1;
  public internalSteps: number = 100;

  public calculatePhysics(dt: number): void {
    dt *= this.timeWarp;

    for (let i = 0; i < this.internalSteps; i++) {
      this.calculatePhysicsInternal(dt / this.internalSteps);
    }
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

  public refreshReactionAndFrictionAwareness(): void {
    this.lines
      .filter((line: Line) => line.reactionAndFrictionForceSource)
      .forEach((line: Line) => line.reactionAndFrictionForceSource.refreshAwareness());
  }

  protected calculatePhysicsInternal(dt: number): void {
    this.points
      .filter((point: Point) => !point.isStatic)
      .forEach((point: Point) => {
        point.forces.forEach((force: Force) => {
          force.calculateForce(point, dt);
        });
      });

    this.points
      .filter((point: Point) => !point.isStatic)
      .forEach((point: Point) => {
        point.force.reset();
        point.forces.forEach(force => {
          point.force.add(force.vector);
        });

        point.acceleration = point.force.clone().divideScalar(point.mass);

        // TODO double check formulas with 'Velocity Verlet' (probably velocity is calculated incorrectly)
        // https://en.wikipedia.org/wiki/Verlet_integration
        point.position
          .add(point.velocity.clone().multiplyScalar(dt))
          .add(point.acceleration.clone().multiplyScalar((dt * dt) / 2));
        point.velocity.add(point.acceleration.clone().multiplyScalar(dt));
      });
  }
}
