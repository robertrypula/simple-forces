// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Point } from '@core/constraints/point';
import { LiftAndDragForceSource } from '@core/forces/lift-and-drag';
import { ReactionAndFrictionForceSource } from '@core/forces/reaction-and-friction';
import { SpringAndDamperForceSource } from '@core/forces/spring-and-damper';
import { ThrustForceSource } from '@core/forces/thrust';
import { World } from '@core/world';

export class Line {
  public length: number;
  public name: string;

  public liftAndDragForceSource: LiftAndDragForceSource;
  public reactionAndFrictionForceSource: ReactionAndFrictionForceSource;
  public springAndDamperForceSource: SpringAndDamperForceSource;
  public thrustForceSource: ThrustForceSource;

  public constructor(public world: World, public pointA: Point, public pointB: Point) {
    this.length = pointB.position
      .clone()
      .subtract(pointA.position)
      .getMagnitude();
  }

  public createLiftAndDragForceSource(): Line {
    this.liftAndDragForceSource = new LiftAndDragForceSource(this.world, this);

    return this;
  }

  public createReactionAndFrictionForceSource(): Line {
    this.reactionAndFrictionForceSource = new ReactionAndFrictionForceSource(this.world, this);

    return this;
  }

  public createSpringAndDamperForceSource(): Line {
    this.springAndDamperForceSource = new SpringAndDamperForceSource(this.world, this);

    return this;
  }

  public createThrustForceSource(): Line {
    this.thrustForceSource = new ThrustForceSource(this.world, this);

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
