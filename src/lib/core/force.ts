// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { ForceType } from '@core/models';
import { Point } from '@core/point';
import { World } from '@core/world';

/*tslint:disable:max-classes-per-file*/

export abstract class Force {
  public vector: Complex = Complex.create();

  protected constructor(public readonly forceType: ForceType, public readonly forceSource: ForceSource) {}

  public abstract calculateForce(point: Point, dt?: number): void;
}

// ----------------------------------------------------------------

export abstract class ForceSource {
  protected constructor(public world: World) {}

  protected forEachWorldPointNotYetAwareAboutTheSource(handler: (point: Point) => void) {
    this.world.points.forEach((point: Point): void => {
      const pointNotYetAwareAboutTheSource: boolean = !point.forces.some(force => force.forceSource === this);

      pointNotYetAwareAboutTheSource && handler(point);
    });
  }
}
