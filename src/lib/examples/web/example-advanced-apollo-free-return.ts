// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { Apollo, Axis, Earth, EARTH_MEAN_RADIUS, format, Iss, Moon, MOON_MEAN_RADIUS } from '@';

import { AbstractExample } from '@examples/web/abstract-example';

export class ExampleAdvancedApolloFreeReturn extends AbstractExample {
  public axis: Axis;
  public earth: Earth;
  public moon: Moon;

  public apollo: Apollo;
  public iss: Iss;

  public closestMoonApproach: number = Infinity;

  public createScene(): void {
    this.axis = new Axis(this.world);
    this.earth = new Earth(this.world);

    this.moon = new Moon(this.world);
    this.moon.orbitAroundEarthAtOrigin(-53.5);

    this.apollo = new Apollo(this.world);
    this.apollo.translunarInjectionWithEarthAtOrigin(180);

    this.iss = new Iss(this.world);
    this.iss.orbitAroundEarthAtOrigin(0);

    this.world.internalSteps = 10000;
    this.renderer.camera = this.apollo.center;

    setInterval(() => {
      this.world.createPoint(this.apollo.center.position.clone()).isStatic = true;
    }, 2000);
  }

  public timeTick(dt: number): void {
    const apolloPosition = this.apollo.center.position;
    const apolloAltitudeEarth = apolloPosition.getMagnitude() - EARTH_MEAN_RADIUS;
    const apolloAltitudeMoon =
      apolloPosition
        .clone()
        .subtract(this.moon.center.position)
        .getMagnitude() - MOON_MEAN_RADIUS;

    if (apolloAltitudeEarth < 1e6) {
      this.world.timeWarp = 30;
      this.renderer.zoom = 0.0001 * 1.5;
    } else if (apolloAltitudeMoon < 10e6) {
      this.world.timeWarp = 60 * 10;
      this.renderer.zoom = 0.00001 * 1.5;
    } else {
      this.world.timeWarp = 3600 * 2;
      this.renderer.zoom = 0.000001 * 1.5;
    }

    this.closestMoonApproach = Math.min(this.closestMoonApproach, apolloAltitudeMoon);

    this.log(
      this.timeTickWithLog(dt) +
        'Iss altitude: ' +
        ((this.iss.center.position.getMagnitude() - EARTH_MEAN_RADIUS) / 1e3).toFixed(2) +
        ' km\n' +
        'Apollo altitude (Earth): ' +
        format(apolloAltitudeEarth, 3, 1e6) +
        ' thousands km\n' +
        'Apollo altitude (Moon): ' +
        format(apolloAltitudeMoon, 3, 1e6) +
        ' thousands km\n' +
        'Apollo closest approach to Moon: ' +
        format(this.closestMoonApproach, 3, 1e6) +
        ' thousands km\n' +
        'Moon/Earth center distance: ' +
        this.moon.center.position.toStringMagnitude(2, 1e6) +
        ' thousands km\n'
    );
  }
}
