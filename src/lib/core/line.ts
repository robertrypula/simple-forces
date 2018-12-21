// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Complex } from './complex';
import { SpringForceManager } from './forces/spring';
import { SurfaceReactionForceManager } from './forces/surface-reaction';
import { ThrustForceManager } from './forces/thrust';
import { Point } from './point';
import { World } from './world';

export class Line {
  public length: number;
  public thrustForceManager: ThrustForceManager;
  public springForceManager: SpringForceManager;
  public surfaceReactionForceManager: SurfaceReactionForceManager;
  public name: string;

  public constructor(
    public world: World,
    public pointA: Point,
    public pointB: Point
  ) {
    this.length = pointB.position.clone().subtract(pointA.position).getMagnitude();
  }

  public createThrustForce(): void {
    this.thrustForceManager = new ThrustForceManager(this.world, this);
  }

  public createSpringForce(): void {
    this.springForceManager = new SpringForceManager(this.world, this);
  }

  public createSurfaceReactionForce(): void {
    this.surfaceReactionForceManager = new SurfaceReactionForceManager(this.world, this);
  }

  public getDirection(): Complex {
    return this.pointB.position.clone().subtract(this.pointA.position);
  }

  public getUnitAngle(): number {
    return this.getDirection().getUnitAngle();
  }
}
