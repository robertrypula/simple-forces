// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Apollo } from '../objects/apollo';
import { Axis } from '../objects/axis';
import { Earth } from '../objects/earth';
import { Iss } from '../objects/iss';
import { Moon } from '../objects/moon';
import { format } from '../tools';
import { ExampleCore } from './example-core';

export class Example002 extends ExampleCore {
  public axis: Axis;
  public earth: Earth;
  public moon: Moon;

  public apollo: Apollo;
  public iss: Iss;

  public constructor(
    ctx: CanvasRenderingContext2D,
    logElement: HTMLElement
  ) {
    super(ctx, logElement);
    this.createScene();
  }

  public createScene(): void {
    this.axis = new Axis(this.world);
    this.earth = new Earth(this.world);

    this.moon = new Moon(this.world);
    this.moon.orbitAroundEarthAtOrigin(-53.5);

    this.apollo = new Apollo(this.world);
    this.apollo.translunarInjectionWithEarthAtOrigin(180);

    this.iss = new Iss(this.world);
    this.iss.orbitAroundEarthAtOrigin(0);

    this.world.refreshGravityAwareness();
    this.world.refreshSurfaceReactionAwareness();

    this.world.internalSteps = 10000;
    this.renderer.zoom = 0.000001 * 1.5;
    // this.renderer.zoom = 0.00001 * 1.5;
    this.world.timeWarp = 3600 * 2;            // 1 second -> 2 hours
    // this.world.timeWarp = 60 * 60;
    // this.world.timeWarp = 60 * 5;

    setInterval(() => {
      this.world.createPoint(this.apollo.center.position.clone()).isStatic = true;
    }, 2000);
  }

  public timeTick(dt: number): void {
    this.log(
      this.timeTickWithLog(dt) +
      this.spacecraftLog() +
      'Moon Distance: ' + this.moon.center.position.toStringMagnitude(2, 1e6) + ' thousands km\n'
    );
  }

  public spacecraftLog() {
    const apolloPosition = this.apollo.center.position;
    const apolloAltitudeEarth = apolloPosition.getMagnitude() - Earth.RADIUS;
    const apolloAltitudeMoon = apolloPosition.clone().subtract(this.moon.center.position).getMagnitude() - Moon.RADIUS;

    return '' +
      'Iss altitude: ' + ((this.iss.center.position.getMagnitude() - Earth.RADIUS) / 1e3).toFixed(2) + ' km\n' +
      'Apollo altitude (Earth): ' + format(apolloAltitudeEarth, 3, 1e6) + ' thousands km\n' +
      'Apollo altitude (Moon): ' + format(apolloAltitudeMoon, 3, 1e6) + ' thousands km\n';
  }
}
