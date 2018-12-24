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

  public createThrustForce(): Line {
    this.thrustForceManager = new ThrustForceManager(this.world, this);

    return this;
  }

  public createSpringForce(): Line {
    this.springForceManager = new SpringForceManager(this.world, this);

    return this;
  }

  public createSurfaceReactionForce(): Line {
    this.surfaceReactionForceManager = new SurfaceReactionForceManager(this.world, this);

    return this;
  }

  public getDirection(): Complex {
    return this.pointB.position.clone().subtract(this.pointA.position);
  }

  public getUnitAngle(): number {
    return this.getDirection().getUnitAngle();
  }

  public setIsStatic(isStatic: boolean): Line {
    this.pointA.isStatic = isStatic;
    this.pointB.isStatic = isStatic;

    return this;
  }
}
