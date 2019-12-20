// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Point } from '..';
import { ExampleEarthSurface } from './example-earth-surface';

export class Example001 extends ExampleEarthSurface {
  public ball: Point;

  public constructor(
    ctx: CanvasRenderingContext2D,
    logElement: HTMLElement
  ) {
    super(ctx, logElement);
    this.createScene();
  }

  public createScene(): void {
    this.createEarthSurfaceEnvironment();

    this.ball = this.world.createPoint();

    this.world.refreshGravityAwareness();
    this.world.refreshSurfaceReactionAwareness();
    // this.world.timeWarp = 0.1;


    // this.renderer.zoom = 0.01;
  }

  public timeTick(dt: number): void {
    this.log(
      this.timeTickWithLog(dt) +
      'Ball position: ' + this.ball.position.toStringXY() + '\n' +
      'Ball velocity: ' + this.ball.velocity.toStringXY() + '\n' +
      'Ball acceleration: ' + this.ball.acceleration.toStringXY(3)
    );
  }
}
