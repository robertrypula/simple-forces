// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Line } from '@core/constraints/line';
import { Point } from '@core/constraints/point';
import { Force, ForceSource } from '@core/force';
import { ForceType } from '@core/models';
import { World } from '@core/world';

/*tslint:disable:max-classes-per-file*/

export class LiftAndDragForce extends Force {
  public constructor(public forceSource: LiftAndDragForceSource) {
    super(ForceType.LiftAndDrag, forceSource);
  }

  public calculateForce(point: Point): void {
    // TODO implement
  }
}

// ----------------------------------------------------------------

export class LiftAndDragForceSource extends ForceSource {
  public constructor(world: World, public line: Line) {
    super(world);

    // TODO implement

    // IMPORTANT: call world.refreshLiftAndDragAwareness or world.refreshAwareness when the scene is ready
  }

  public refreshAwareness(): void {
    this.forEachWorldPointNotYetAwareAboutTheSource((point: Point): void => {
      point.forces.push(new LiftAndDragForce(this));
    });
  }
}
