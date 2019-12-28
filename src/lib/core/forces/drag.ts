// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Force, ForceSource } from '@core/force';
import { ForceType } from '@core/models';
import { Point } from '@core/point';
import { World } from '@core/world';

/*tslint:disable:max-classes-per-file*/

export class DragForce extends Force {
  public constructor(public forceSource: DragForceSource) {
    super(ForceType.Drag, forceSource);
  }

  public calculateForce(point: Point): void {
    // TODO implement
  }
}

// ----------------------------------------------------------------

export class DragForceSource extends ForceSource {
  public constructor(world: World, public point: Point) {
    super(world);
    // remember to call refreshDragAwareness after adding all objects to the world
  }

  public refreshAwareness(): void {
    this.forEachWorldPointNotYetAwareAboutTheSource((point: Point): void => {
      point.forces.push(new DragForce(this));
    });
  }
}
