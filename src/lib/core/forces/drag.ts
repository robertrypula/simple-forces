// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Point } from '@core/constraints/point';
import { Force, ForceSource } from '@core/force';
import { ForceType } from '@core/models';
import { World } from '@core/world';

/*tslint:disable:max-classes-per-file*/

export class DragForce extends Force {
  public constructor(public forceSource: DragForceSource) {
    super(ForceType.Drag, forceSource);
  }

  public calculateForce(point: Point): void {
    // TODO implement
    // point.velocity.clone().normalize().multiplyScalar(-());
  }

  public getStaticPressure(point: Point): number {
    return 101325; // TODO implement and move constants to constants.ts
  }
}

// ----------------------------------------------------------------

export class DragForceSource extends ForceSource {
  public constructor(world: World, public point: Point) {
    super(world);

    // TODO implement

    // IMPORTANT: call world.refreshDragAwareness or world.refreshAwareness when the scene is ready
  }

  public refreshAwareness(): void {
    this.forEachWorldPointNotYetAwareAboutTheSource((point: Point): void => {
      point.forces.push(new DragForce(this));
    });
  }
}
