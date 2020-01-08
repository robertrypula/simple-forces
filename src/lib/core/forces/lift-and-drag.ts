// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

import { DEFAULT_ATMOSPHERE_END_ALTITUDE } from '@core/constants';
import { Line } from '@core/constraints-hosts/line';
import { Point } from '@core/constraints-hosts/point';
import { Force, ForceSource } from '@core/force';
import { ForceType } from '@core/models';
import { World } from '@core/world';

/*tslint:disable:max-classes-per-file*/

export class LiftAndDragForce extends Force {
  public constructor(public forceSource: LiftAndDragForceSource, public line: Line) {
    super(ForceType.LiftAndDrag, forceSource);
  }

  public calculateForce(point: Point): void {
    // TODO implement
  }
}

// ----------------------------------------------------------------

export class LiftAndDragForceSource extends ForceSource {
  public atmosphereEndAltitude = DEFAULT_ATMOSPHERE_END_ALTITUDE;

  // https://en.wikipedia.org/wiki/International_Standard_Atmosphere
  // https://en.wikipedia.org/wiki/Barometric_formula
  // https://cdn.britannica.com/56/97256-050-4D739762/layers-atmosphere-Earth-yellow-line-height-response.jpg
  // https://www.eoas.ubc.ca/courses/atsc113/flying/met_concepts/02-met_concepts/02a-std_atmos-P/index.html
  // h    - height above sea level (m)
  // h[b] - height at bottom of layer b (meters; e.g., h1 = 11 000 m)
  // P[b] - static pressure
  // T[b] - standard temperature
  // M    - molar mass of Earth's air: 0.0289644
  // g    - gravitational acceleration: 9.80665
  // R    - universal gas constant: 8.3144598
  //
  // 22632.10 * Math.exp(-(0.02896 * 9.81 * (11100 - 11000))/(8.3143*216.65) )
  // pressure = P[b] * Math.exp(-(g * M * (h - h[b])) / (R * T[b]))
  /*
    const h = [0, 11e3, 20e3, 32e3, 47e3, 51e3, 71e3]
    const P = [ todo copy from wiki's table ]
    const T = [ todo copy from wiki's table ]
   */

  public constructor(world: World, public point: Point) {
    super(world);

    // TODO implement

    // IMPORTANT: call world.refreshLiftAndDragAwareness or world.refreshAwareness when the scene is ready
  }

  public refreshAwareness(): void {
    this.forEachWorldLineNotYetAwareAboutTheSource((line: Line): void => {
      line.forceSources.push(this);
      line.pointA.forces.push(new LiftAndDragForce(this, line));
    });
  }
}
