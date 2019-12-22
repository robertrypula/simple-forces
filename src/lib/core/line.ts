// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { SpringForceManager } from '@core/forces/spring';
import { SurfaceReactionForceManager } from '@core/forces/surface-reaction';
import { ThrustForceManager } from '@core/forces/thrust';
import { Point } from '@core/point';
import { World } from '@core/world';

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
