// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Spacecraft } from '@'; // in your code it would be: ... from 'simple-forces'
import { ExampleEarthSurface } from '../example-earth-surface';

export class Example004 extends ExampleEarthSurface {
  public spacecraft: Spacecraft;

  public constructor(
    ctx: CanvasRenderingContext2D,
    logElement: HTMLElement
  ) {
    super(ctx, logElement);
    this.createScene();
  }

  public createScene(): void {
    this.createEarthSurfaceEnvironment();

    this.spacecraft = new Spacecraft(this.world);

    this.world.refreshGravityAwareness();
    this.world.refreshSurfaceReactionAwareness();
  }

  public timeTick(dt: number): void {
    this.log(
      this.timeTickWithLog(dt)
    );
  }
}
