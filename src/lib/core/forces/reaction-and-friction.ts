// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import {
  DEFAULT_SURFACE_BOUNDING_BOX,
  DEFAULT_SURFACE_FRICTION_B_COEFFICIENT,
  DEFAULT_SURFACE_REACTION_B_COEFFICIENT,
  DEFAULT_SURFACE_REACTION_K_COEFFICIENT
} from '@core/constants';
import { Line } from '@core/constraints-hosts/line';
import { Point } from '@core/constraints-hosts/point';
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
    const simplePointLineA: SimplePoint = origin;
    const simplePointLineB: SimplePoint = line.pointB.cloneAsSimplePoint().transform(origin, unitAngle, false);

    // NOTES:
    // - kinetic friction implementation assumes dry surface
    //   https://physics.stackexchange.com/questions/48534/does-kinetic-friction-increase-as-speed-increases
    // - there is no static friction (yet ;])
    // - reaction force damping ignores the Y velocity of the line point B
    //   (it may cause issues when one end of line is in high speed and hits the point)
    // - kinetic friction ignores the X velocity of the line point B

    if (this.isInsideCollisionArea(simplePoint, simplePointLineB)) {
      const collisionUnitX: number = simplePoint.position.x / simplePointLineB.position.x;
      const velocityUnitX: number = simplePoint.velocity.x === 0 ? 0 : simplePoint.velocity.x > 0 ? 1 : -1;
      const reactionSpringForce: number = -simplePoint.position.y * this.forceSource.reactionK;
      const reactionDampingForce: number = -simplePoint.velocity.y * this.forceSource.reactionB;
      let reactionForce: number = reactionSpringForce + reactionDampingForce;
      let kineticFrictionForce: number = reactionForce * this.forceSource.frictionB * -velocityUnitX;

      reactionForce *= point.mass;
      kineticFrictionForce *= point.mass;

      simplePoint.force = Complex.create(kineticFrictionForce, reactionForce);
      this.vector = simplePoint.transformBackOnlyForce(unitAngle).force;

      // apply force of collision to the points that define the surface as well
      simplePointLineA.force = Complex.create(-kineticFrictionForce, -(reactionForce * (1 - collisionUnitX)));
      simplePointLineB.force = Complex.create(-kineticFrictionForce, -(reactionForce * collisionUnitX));
      this.forceSource.pointAForce.vector = simplePointLineA.transformBackOnlyForce(unitAngle).force;
      this.forceSource.pointBForce.vector = simplePointLineB.transformBackOnlyForce(unitAngle).force;
    } else {
      this.vector.reset();
      this.forceSource.pointAForce.vector.reset();
      this.forceSource.pointBForce.vector.reset();
    }
  }

  protected isDefiningSurface(point: Point): boolean {
    // skip points that define the surface as they will be handled by point that collides with the surface
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
  public frictionB: number = DEFAULT_SURFACE_FRICTION_B_COEFFICIENT;
  public reactionB: number = DEFAULT_SURFACE_REACTION_B_COEFFICIENT;
  public reactionK: number = DEFAULT_SURFACE_REACTION_K_COEFFICIENT;

  public boundingBoxMargin: number = DEFAULT_SURFACE_BOUNDING_BOX;
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
    this.forEachWorldPointNotYetAwareAboutTheSource((point: Point): void => {
      point.forces.push(new ReactionAndFrictionForce(this));
    });
  }
}
