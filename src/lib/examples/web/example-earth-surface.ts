// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import {
  Complex,
  Earth,
  Line
} from '@'; // in your code it would be: ... from 'simple-forces'
import { ExampleCore } from './example-core';

export abstract class ExampleEarthSurface extends ExampleCore {
  public earth: Earth;
  public earthSurface: Line;

  public createEarthSurfaceEnvironment(): void {
    this.earth = new Earth(this.world);
    this.earth.translate(Complex.create(0, -Earth.RADIUS));    // move earth below the world's origin

    this.earthSurface = this.world.createLine(
      this.world.createPoint(Complex.create(-5, -1.5)),
      this.world.createPoint(Complex.create(5, -1.5))
    );
    this.earthSurface.setIsStatic(true);
    this.earthSurface.createSurfaceReactionForce();
  }
}
