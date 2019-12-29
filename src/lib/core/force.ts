// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Line } from '@core/constraints/line';
import { Point } from '@core/constraints/point';
import { ForceType, NotYetAwareLineHandler, NotYetAwarePointHandler } from '@core/models';
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

  protected forEachWorldLineNotYetAwareAboutTheSource(handler: NotYetAwareLineHandler) {
    this.world.lines.forEach((line: Line): void => {
      const lineNotYetAwareAboutTheSource: boolean = !line.forceSources.some(forceSource => forceSource === this);

      lineNotYetAwareAboutTheSource && handler(line);
    });
  }

  protected forEachWorldPointNotYetAwareAboutTheSource(handler: NotYetAwarePointHandler) {
    this.world.points.forEach((point: Point): void => {
      const pointNotYetAwareAboutTheSource: boolean = !point.forces.some(force => force.forceSource === this);

      pointNotYetAwareAboutTheSource && handler(point);
    });
  }
}
