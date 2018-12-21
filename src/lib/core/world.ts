// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Angle } from './angle';
import { Complex } from './complex';
import { Force } from './force';
import { Line } from './line';
import { Point } from './point';

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

  public refreshGravityAwareness(): void {
    const gravitySources = this.points.filter((point: Point) => point.gravityForceManager);

    gravitySources.forEach((gravitySource: Point) => gravitySource.gravityForceManager.refreshAwareness());
  }

  public refreshSurfaceReactionAwareness(): void {
    const surfaceReactionSources = this.lines.filter((line: Line) => line.surfaceReactionForceManager);

    surfaceReactionSources.forEach(
      (surfaceReactionSource: Line) => surfaceReactionSource.surfaceReactionForceManager.refreshAwareness()
    );
  }

  protected calculatePhysicsInternal(dt: number): void {
    this.points
      .filter((point: Point) => !point.isStatic)
      .forEach((point: Point) => {
        point.forces.forEach((force: Force) => {
          force.calculateForce(point);
        });
      });

    this.points
      .filter((point: Point) => !point.isStatic)
      .forEach((point: Point) => {
        point.force.reset();
        point.forces.forEach((force) => {
          point.force.add(force.vector);
        });

        point.acceleration = point.force.clone().divideScalar(point.mass);
        point.position
          .add(point.velocity.clone().multiplyScalar(dt))
          .add(point.acceleration.clone().multiplyScalar(dt * dt / 2));
        point.velocity.add(point.acceleration.clone().multiplyScalar(dt));
      });
  }
}
