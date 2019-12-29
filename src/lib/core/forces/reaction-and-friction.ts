// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Line } from '@core/constraints/line';
import { Point } from '@core/constraints/point';
import { Force, ForceSource } from '@core/force';
import { ForceType } from '@core/models';
import { World } from '@core/world';

/*tslint:disable:max-classes-per-file*/

export class ReactionAndFrictionForce extends Force {
  public constructor(public forceSource: ReactionAndFrictionForceSource) {
    super(ForceType.ReactionAndFriction, forceSource);
  }

  public calculateForce(point: Point): void {
    if (this.isDefiningSurface(point) || this.isFarFromTheSurface(point)) {
      return;
    }

    const unitAngle = this.forceSource.line.getUnitAngle();
    const origin = this.forceSource.line.pointA.cloneAsSimplePoint();

    const pointL = point.cloneAsSimplePoint().transform(origin, unitAngle);
    const pointAL = this.forceSource.line.pointA.cloneAsSimplePoint().transform(origin, unitAngle);
    const pointBL = this.forceSource.line.pointB.cloneAsSimplePoint().transform(origin, unitAngle);

    if (
      pointL.position.y < 0 &&
      pointL.position.y > -this.forceSource.boundingBoxMargin &&
      pointL.position.x <= pointBL.position.x &&
      pointL.position.x >= 0
    ) {
      const collisionUnitX = pointL.position.x / pointBL.position.x;
      const forceAmount = -pointL.position.y * this.forceSource.k;

      pointL.force = Complex.create(0, forceAmount);
      this.vector = pointL.transformBack(origin, unitAngle).force;

      // apply force of collision to the points that define the surface as well
      pointAL.force = Complex.create(0, -(forceAmount * (1 - collisionUnitX)));
      pointBL.force = Complex.create(0, -(forceAmount * collisionUnitX));
      this.forceSource.pointAForce.vector = pointAL.transformBack(origin, unitAngle).force;
      this.forceSource.pointBForce.vector = pointBL.transformBack(origin, unitAngle).force;
    } else {
      this.vector.reset();
    }
  }

  protected isDefiningSurface(point: Point): boolean {
    // we skip points that define the surface as they will be handled by point that collides with the surface
    return point === this.forceSource.line.pointA || point === this.forceSource.line.pointB;
  }

  protected isFarFromTheSurface(point: Point): boolean {
    const x = point.position.x;
    const y = point.position.y;
    const positionA = this.forceSource.line.pointA.position;
    const positionB = this.forceSource.line.pointB.position;
    const margin = this.forceSource.boundingBoxMargin;
    const x1 = Math.min(positionA.x, positionB.x) - margin;
    const x2 = Math.max(positionA.x, positionB.x) + margin;
    const y1 = Math.min(positionA.y, positionB.y) - margin;
    const y2 = Math.max(positionA.y, positionB.y) + margin;

    return x < x1 || x > x2 || y < y1 || y > y2;
  }
}

// ----------------------------------------------------------------

export class ReactionAndFrictionForceSource extends ForceSource {
  public k: number = 500.0;
  public boundingBoxMargin = 0.35;
  public pointAForce: ReactionAndFrictionForce; // NOTE: caching references to force speeds up access to it as each
  public pointBForce: ReactionAndFrictionForce; // point have array of forces and we would need to use slower find()

  public constructor(world: World, public line: Line) {
    super(world);

    // NOTE: this is needed as points that defines the surface also 'feels' the force of collision with the surface
    line.pointA.forces.push((this.pointAForce = new ReactionAndFrictionForce(this)));
    line.pointB.forces.push((this.pointBForce = new ReactionAndFrictionForce(this)));

    // IMPORTANT: call world.refreshReactionAndFrictionAwareness or world.refreshAwareness when the scene is ready
  }

  public refreshAwareness(): void {
    this.forEachWorldPointNotYetAwareAboutTheSource((point: Point) => {
      point.forces.push(new ReactionAndFrictionForce(this));
    });
  }
}
