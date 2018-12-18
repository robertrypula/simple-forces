// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '..';
import { Point, World } from '..';

export enum ForceType {
  Drag = 'Drag',
  Gravity = 'Gravity',
  Join = 'Joint',
  Lift = 'Lift',
  Spring = 'Spring',
  SurfaceFriction = 'SurfaceFriction',
  SurfaceReaction = 'SurfaceReaction',
  Thrust = 'Thrust',
  Torque = 'Torque'
}

/*tslint:disable:max-classes-per-file*/

export abstract class Force {
  public vector: Complex = Complex.create();

  protected constructor(
    public readonly forceType: ForceType,
    public readonly forceManager: ForceManager
  ) { }

  public abstract calculateForce(point: Point): void;
}

// ----------------------------------------------------------------

export abstract class ForceManager {
  protected constructor(
    public world: World
  ) { }

  protected forEachWorldPoint(handler: (point: Point, isNotAware: boolean) => void) {
    this.world.points.forEach((point: Point) => {
      const isNotAware = !point.forces.some((force) => force.forceManager === this);

      handler(point, isNotAware);
    });
  }
}
