// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { Apollo, Earth, EARTH_MEAN_RADIUS, formatNumber, Iss, Moon, MOON_MEAN_RADIUS } from '@';

import { AbstractExample } from '@examples/abstract-example';

export class ExampleAdvancedApolloFreeReturn extends AbstractExample {
  public earth: Earth;
  public moon: Moon;

  public apollo: Apollo;
  public iss: Iss;

  public closestMoonApproach: number = Infinity;

  public createScene(): void {
    this.earth = new Earth(this.world);

    this.moon = new Moon(this.world);
    this.moon.orbitAroundEarthAtOrigin(-53.5);

    this.apollo = new Apollo(this.world);
    this.apollo.translunarInjectionWithEarthAtOrigin(180);

    this.iss = new Iss(this.world);
    this.iss.orbitAroundEarthAtOrigin(180);

    this.world.physics.internalSteps = 10000;
    this.world.viewport.camera = this.apollo.center;

    setInterval(() => {
      this.world.createPoint(this.apollo.center.position.clone()).isStatic = true;
      this.world.createPoint(this.moon.center.position.clone()).isStatic = true;
    }, 500);
  }

  public animationFrame(dt: number): void {
    super.animationFrame(dt);

    const apolloPosition = this.apollo.center.position;
    const apolloAltitudeEarth = apolloPosition.getMagnitude() - EARTH_MEAN_RADIUS;
    const apolloAltitudeMoon =
      apolloPosition
        .clone()
        .subtract(this.moon.center.position)
        .getMagnitude() - MOON_MEAN_RADIUS;

    if (apolloAltitudeEarth < 1e6) {
      this.world.physics.timeWarp = 30;
      this.world.viewport.zoom = (100 * 136) / 1e10;
    } else if (apolloAltitudeMoon < 10e6) {
      this.world.physics.timeWarp = 60 * 10;
      this.world.viewport.zoom = (10 * 136) / 1e10;
    } else {
      this.world.physics.timeWarp = 3600 * 2;
      this.world.viewport.zoom = (1.2 * 136) / 1e10;
    }

    this.closestMoonApproach = Math.min(this.closestMoonApproach, apolloAltitudeMoon);

    this.log = [
      ...this.log,
      ['Iss altitude', ((this.iss.center.position.getMagnitude() - EARTH_MEAN_RADIUS) / 1e3).toFixed(2) + ' km'],
      ['Apollo altitude (Earth)', formatNumber(apolloAltitudeEarth, 3, 1e6) + ' thousands km'],
      ['Apollo altitude (Moon)', formatNumber(apolloAltitudeMoon, 3, 1e6) + ' thousands km'],
      ['Apollo closest approach to Moon', formatNumber(this.closestMoonApproach, 3, 1e6) + ' thousands km'],
      ['Moon/Earth center distance', this.moon.center.position.toStringMagnitude(2, 1e6) + ' thousands km']
    ];
  }
}
