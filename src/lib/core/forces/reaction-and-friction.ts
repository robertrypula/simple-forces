// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Line } from '@core/constraints/line';
import { Point } from '@core/constraints/point';
import { Force, ForceSource } from '@core/force';
import { ForceType } from '@core/models';
import { SimplePoint } from '@core/simple-point';
import { World } from '@core/world';

/*tslint:disable:max-classes-per-file*/

export class ReactionAndFrictionForce extends Force {
  public constructor(public forceSource: ReactionAndFrictionForceSource) {
    super(ForceType.ReactionAndFriction, forceSource);
  }

  public calculateForce(point: Point, dt: number): void {
    if (this.isDefiningSurface(point) || this.isFarFromTheSurface(point)) {
      return;
    }

    const line: Line = this.forceSource.line;
    const unitAngle: number = line.getUnitAngle();
    const origin: SimplePoint = line.pointA.cloneAsSimplePoint();
    const simplePoint: SimplePoint = point.cloneAsSimplePoint().transform(origin, unitAngle);
    const simplePointLineA: SimplePoint = line.pointA.cloneAsSimplePoint().transform(origin, unitAngle);
    const simplePointLineB: SimplePoint = line.pointB.cloneAsSimplePoint().transform(origin, unitAngle);

    if (this.isInsideCollisionArea(simplePoint, simplePointLineB)) {
      const collisionUnitX: number = simplePoint.position.x / simplePointLineB.position.x;
      const reactionSpringForce: number = -simplePoint.position.y * this.forceSource.kReaction;
      const reactionDampingForce: number = -simplePoint.velocity.y * this.forceSource.bReaction;
      let reactionForce: number = reactionSpringForce + reactionDampingForce;
      let frictionForce: number = reactionForce * this.forceSource.bFriction * (simplePoint.velocity.x > 0 ? -1 : 1);

      reactionForce *= point.mass;
      frictionForce *= point.mass;

      simplePoint.force = Complex.create(frictionForce, reactionForce);
      this.vector = simplePoint.transformBack(origin, unitAngle).force;

      // apply force of collision to the points that define the surface as well
      simplePointLineA.force = Complex.create(-frictionForce, -(reactionForce * (1 - collisionUnitX)));
      simplePointLineB.force = Complex.create(-frictionForce, -(reactionForce * collisionUnitX));
      this.forceSource.pointAForce.vector = simplePointLineA.transformBack(origin, unitAngle).force;
      this.forceSource.pointBForce.vector = simplePointLineB.transformBack(origin, unitAngle).force;
    } else {
      this.vector.reset();
      this.forceSource.pointAForce.vector.reset();
      this.forceSource.pointBForce.vector.reset();
    }
  }

  protected isDefiningSurface(point: Point): boolean {
    // we skip points that define the surface as they will be handled by point that collides with the surface
    return point === this.forceSource.line.pointA || point === this.forceSource.line.pointB;
  }

  protected isInsideCollisionArea(simplePoint: SimplePoint, simplePointLineB: SimplePoint): boolean {
    return (
      simplePoint.position.y < 0 &&
      simplePoint.position.y >= -this.forceSource.boundingBoxMargin &&
      simplePoint.position.x <= simplePointLineB.position.x &&
      simplePoint.position.x >= 0
    );
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
  public kReaction: number = 10000.0;
  public bReaction: number = 20;
  public bFriction: number = 0.2;
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
