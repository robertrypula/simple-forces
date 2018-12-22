// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '../complex';
import { Force, ForceManager, ForceType } from '../force';
import { Line } from '../line';
import { Point } from '../point';
import { World } from '../world';

/*tslint:disable:max-classes-per-file*/

export class SurfaceReactionForce extends Force {
  public constructor(
    public line: Line,
    public forceManager: SurfaceReactionForceManager
  ) {
    super(ForceType.SurfaceReaction, forceManager);
  }

  public calculateForce(point: Point): void {
    if (this.isDefiningSurface(point) || this.isFarFromTheSurface(point)) {
      return;
    }

    const unitAngle = this.line.getUnitAngle();
    const origin = this.line.pointA.cloneAsSimplePoint();

    const pointL = point.cloneAsSimplePoint().transform(origin, unitAngle);
    const pointAL = this.line.pointA.cloneAsSimplePoint().transform(origin, unitAngle);
    const pointBL = this.line.pointB.cloneAsSimplePoint().transform(origin, unitAngle);

    if (
      pointL.position.y < 0 &&
      pointL.position.y > -this.forceManager.boundingBoxMargin &&
      pointL.position.x <= pointBL.position.x &&
      pointL.position.x >= 0
    ) {
      const collisionUnitX = pointL.position.x / pointBL.position.x;
      const forceAmount = -pointL.position.y * this.forceManager.k;

      pointL.force = Complex.create(0, forceAmount);
      pointAL.force = Complex.create(0, -(forceAmount * (1 - collisionUnitX)));
      pointBL.force = Complex.create(0, -(forceAmount * collisionUnitX));
      this.vector = pointL.transformBack(origin, unitAngle).force;
      this.line.pointA.forces
        .find((force: Force) => force.forceManager === this.forceManager)
        .vector = pointAL.transformBack(origin, unitAngle).force;
      this.line.pointB.forces
        .find((force: Force) => force.forceManager === this.forceManager)
        .vector = pointBL.transformBack(origin, unitAngle).force;
    } else {
      this.vector.reset();
    }
  }

  protected isDefiningSurface(point: Point): boolean {
    return point === this.line.pointA || point === this.line.pointB;
  }

  protected isFarFromTheSurface(point: Point): boolean {
    const x = point.position.x;
    const y = point.position.y;
    const positionA = this.line.pointA.position;
    const positionB = this.line.pointB.position;
    const margin = this.forceManager.boundingBoxMargin;
    const x1 = Math.min(positionA.x, positionB.x) - margin;
    const x2 = Math.max(positionA.x, positionB.x) + margin;
    const y1 = Math.min(positionA.y, positionB.y) - margin;
    const y2 = Math.max(positionA.y, positionB.y) + margin;

    return x < x1 || x > x2 || y < y1 || y > y2;
  }
}

// ----------------------------------------------------------------

export class SurfaceReactionForceManager extends ForceManager {
  public k: number = 500.0;
  public boundingBoxMargin = 0.35;

  public constructor(
    world: World,
    public line: Line
  ) {
    super(world);
    line.pointA.forces.push(new SurfaceReactionForce(line, this));
    line.pointB.forces.push(new SurfaceReactionForce(line, this));
  }

  public refreshAwareness(): void {
    this.forEachWorldPoint((point: Point, isNotAware: boolean) => {
      if (isNotAware) {
        point.forces.push(new SurfaceReactionForce(this.line, this));
      }
    });
  }
}
