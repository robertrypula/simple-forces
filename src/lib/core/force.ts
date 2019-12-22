// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Point } from '@core/point';
import { World } from '@core/world';

/*tslint:disable:max-classes-per-file*/

export enum ForceType {
  Drag = 'Drag', // adds 'atmosphere' area that affects lines above the 'source' point (affectedByDrag flag needed?)
  Gravity = 'Gravity', // adds force that pulls other points towards one source point
  Join = 'Joint', // keeps defined min/max angle between two lines
  Lift = 'Lift', // adds 'atmosphere' area that affects lines above the 'source' point (affectedByLift flag needed?)
  Spring = 'Spring', // adds force that keeps the distance between two points
  SurfaceFriction = 'SurfaceFriction', // exclude static friction to simplify the code...
  SurfaceReaction = 'SurfaceReaction', // adds 'collision' force when point enters collision area defined by line
  Thrust = 'Thrust', // adds local vector to the line reference frame
  Torque = 'Torque' // adds 'circular' force between floating ends of two connected lines
}

// Proposal for: Drag and Lift
// - unify it as DragAndLift (works on Lines)
// - think what about Drag of a Point
//   - in general point has no dimension so there should be no drag, problem solved ;)

// Proposal for: SurfaceFriction and SurfaceReaction
// - unify it as FrictionAndReaction (works on Lines)

// Proposal for: Join and Torque
// - unify it as JoinAndTorque (works on Angles)

export abstract class Force {
  public vector: Complex = Complex.create();

  protected constructor(public readonly forceType: ForceType, public readonly forceSource: ForceSource) {}

  public abstract calculateForce(point: Point): void;
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
