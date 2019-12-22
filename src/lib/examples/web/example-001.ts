// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Point } from '@'; // in your code it would be: ... from 'simple-forces'
import { ExampleEarthSurface } from './example-earth-surface';

export class Example001 extends ExampleEarthSurface {
  public ball: Point;

  public constructor(ctx: CanvasRenderingContext2D, logElement: HTMLElement) {
    super(ctx, logElement);
    this.createScene();
  }

  public createScene(): void {
    this.createEarthSurfaceEnvironment();
    this.earth.center.radius = null; // due to rounding error the Earth surface is wrongly displayed at that high zoom

    this.ball = this.world.createPoint();

    this.world.refreshGravityAwareness();
    this.world.refreshSurfaceReactionAwareness();
    // this.world.timeWarp = 0.1;
    // this.renderer.zoom = 0.01;
  }

  public timeTick(dt: number): void {
    this.log(
      this.timeTickWithLog(dt) +
        'Ball position: ' +
        this.ball.position.toStringXY() +
        '\n' +
        'Ball velocity: ' +
        this.ball.velocity.toStringXY() +
        '\n' +
        'Ball acceleration: ' +
        this.ball.acceleration.toStringXY(3)
    );
  }
}