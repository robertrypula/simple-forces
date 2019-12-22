// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex, Line, Wheel } from '@'; // in your code it would be: ... from 'simple-forces'
import { ExampleEarthSurface } from './example-earth-surface';

export class Example003 extends ExampleEarthSurface {
  public lineA: Line;
  public lineLeft: Line;
  public wheel: Wheel;

  public constructor(ctx: CanvasRenderingContext2D, logElement: HTMLElement) {
    super(ctx, logElement);
    this.createScene();
  }

  public createScene(): void {
    this.createEarthSurfaceEnvironment();
    this.earth.center.radius = null; // due to rounding error the Earth surface is wrongly displayed at that high zoom

    this.wheel = new Wheel(this.world);
    this.wheel.translate(Complex.create(2, 3));

    this.lineA = this.world.createLine(
      this.world.createPoint(Complex.create(-1, -0.5)),
      this.world.createPoint(Complex.create(5, 1.0))
    );
    this.lineA.setIsStatic(true);
    this.lineA.createSurfaceReactionForce();

    this.lineLeft = this.world.createLine(
      this.world.createPoint(Complex.create(-5, 2)),
      this.world.createPoint(Complex.create(-5, -1))
    );
    this.lineLeft.setIsStatic(true);
    this.lineLeft.createSurfaceReactionForce();

    this.world.refreshGravityAwareness();
    this.world.refreshSurfaceReactionAwareness();

    // this.world.timeWarp = 0.2;
  }

  public timeTick(dt: number): void {
    this.log(this.timeTickWithLog(dt));
  }
}
