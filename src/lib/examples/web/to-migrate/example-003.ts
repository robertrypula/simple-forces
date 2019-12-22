// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Wheel } from '../objects/wheel';
import { ExampleEarthSurface } from '../example-earth-surface';

export class Example003 extends ExampleEarthSurface {
  public wheel: Wheel;

  public constructor(
    ctx: CanvasRenderingContext2D,
    logElement: HTMLElement
  ) {
    super(ctx, logElement);
    this.createScene();
  }

  public createScene(): void {
    this.createEarthSurfaceEnvironment();

    this.wheel = new Wheel(this.world);

    this.world.refreshGravityAwareness();
    this.world.refreshSurfaceReactionAwareness();

    // this.world.timeWarp = 0.2;
  }

  public timeTick(dt: number): void {
    this.log(
      this.timeTickWithLog(dt)
    );
  }
}
