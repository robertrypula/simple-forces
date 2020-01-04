// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { Complex, Earth, EARTH_MEAN_RADIUS, Line } from '@';

import { AbstractExample } from './abstract-example';

export abstract class AbstractEarthSurfaceExample extends AbstractExample {
  public earth: Earth;
  public earthSurface: Line;

  public createEarthSurfaceEnvironment(): void {
    this.earth = new Earth(this.world);
    this.earth.center.radius = null; // due to rounding error the Earth surface is wrongly displayed at that high zoom
    this.earth.translate(Complex.create(0, -EARTH_MEAN_RADIUS)); // move earth below the world's origin

    this.earthSurface = this.world.createLine(
      this.world.createPoint(Complex.create(-5, -1.5)),
      this.world.createPoint(Complex.create(5, -1.5))
    );
    this.earthSurface.setIsStatic(true);
    this.earthSurface.createReactionAndFrictionForceSource();
  }
}
