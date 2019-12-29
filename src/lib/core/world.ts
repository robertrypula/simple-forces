// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Angle } from '@core/constraints/angle';
import { Line } from '@core/constraints/line';
import { Point } from '@core/constraints/point';
import { Force } from '@core/force';

export class World {
  public angles: Angle[] = [];
  public lines: Line[] = [];
  public points: Point[] = [];

  public internalSteps = 100;
  public time = 0;
  public timeWarp = 1;

  public animationFrame(dt: number): void {
    this.calculatePhysics(dt);
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
    this.lines
      .filter((line: Line) => line.liftAndDragForceSource)
      .forEach((line: Line) => line.liftAndDragForceSource.refreshAwareness());
  }

  public refreshReactionAndFrictionAwareness(): void {
    this.lines
      .filter((line: Line) => line.reactionAndFrictionForceSource)
      .forEach((line: Line) => line.reactionAndFrictionForceSource.refreshAwareness());
  }

  protected calculatePhysics(dt: number): void {
    let firstStaticPointIndex: number;

    dt *= this.timeWarp;
    this.time += dt;

    this.points.sort((a: Point, b: Point): number => (a.isStatic === b.isStatic ? 0 : a.isStatic ? 1 : -1));
    firstStaticPointIndex = this.points.findIndex(a => a.isStatic);
    firstStaticPointIndex = firstStaticPointIndex === -1 ? this.points.length : firstStaticPointIndex;

    for (let i = 0; i < this.internalSteps; i++) {
      this.calculatePhysicsInternal(dt / this.internalSteps, firstStaticPointIndex);
    }
  }

  protected calculatePhysicsInternal(dt: number, firstStaticPointIndex: number): void {
    let point: Point;

    for (let i = 0; i < firstStaticPointIndex; i++) {
      point = this.points[i];

      if (!point.isStatic) {
        for (let j = 0; j < point.forces.length; j++) {
          point.forces[j].calculateForce(point, dt);
        }
      }
    }

    for (let i = 0; i < firstStaticPointIndex; i++) {
      point = this.points[i];

      if (!point.isStatic) {
        point.force.reset();
        for (let j = 0; j < point.forces.length; j++) {
          point.force.add(point.forces[j].vector);
        }
        point.acceleration = point.force.clone().divideScalar(point.mass);

        // TODO double check formulas with 'Velocity Verlet' (probably velocity is calculated incorrectly)
        // https://en.wikipedia.org/wiki/Verlet_integration
        point.position
          .add(point.velocity.clone().multiplyScalar(dt))
          .add(point.acceleration.clone().multiplyScalar((dt * dt) / 2));
        point.velocity.add(point.acceleration.clone().multiplyScalar(dt));
      }
    }
  }
}
