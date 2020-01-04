// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Line } from '@core/constraints-hosts/line';
import { Point } from '@core/constraints-hosts/point';
import { ObjectCore } from '@core/object-core';
import { World } from '@core/world';

export class Wheel extends ObjectCore {
  public center: Point;

  public constructor(
    world: World,
    radius: number = 1,
    segments: number = 30,
    tireSegments: number = 3,
    mass: number = 1
  ) {
    super(world);
    this.create(radius, segments, tireSegments, mass);
  }

  protected create(radius: number, segments: number, tireSegments: number, mass: number): void {
    const singlePointMass = mass / (segments + 1);

    this.center = this.world.createPoint(Complex.create(), singlePointMass);
    this.center.name = 'Wheel';

    for (let i = 0; i < segments; i++) {
      const p: Point = this.world.createPoint(Complex.createPolar(i / segments, radius), singlePointMass);
      const l: Line = this.world.createLine(this.center, p);

      l.createSpringAndDamperForceSource();
      this.lines.push(l);
      this.points.push(p);
    }

    for (let i = 0; i < segments; i++) {
      for (let j = 1; j <= tireSegments; j++) {
        const l: Line = this.world.createLine(this.points[i], this.points[(i + j) % segments]);

        l.createSpringAndDamperForceSource();
        this.lines.push(l);
      }
    }

    this.points.push(this.center);
  }
}
