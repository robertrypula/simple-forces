// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Complex, getTime, Line } from '..';
import { Earth } from '../objects/earth';
import { Wheel } from '../objects/wheel';
import { ExampleCore } from './example-core';

export class Example003 extends ExampleCore {
  public earth: Earth;
  public surface: Line;
  public wheel: Wheel;

  public constructor(
    ctx: CanvasRenderingContext2D,
    logElement: HTMLElement
  ) {
    super(ctx, logElement);
    this.createScene();
  }

  public createScene(): void {
    this.earth = new Earth(this.world);
    this.earth.translate(Complex.create(0, -Earth.RADIUS));    // move earth below the world's origin

    this.surface = this.world.createLine(
      this.world.createPoint(Complex.create(-5, -1.5)),
      this.world.createPoint(Complex.create(5, -1.5))
    );
    this.surface.pointA.isStatic = true;
    this.surface.pointB.isStatic = true;
    this.surface.createSurfaceReactionForce();

    this.wheel = new Wheel(this.world);
    // this.wheel.updateStaticFlagInAllPoints(true);

    this.world.refreshGravityAwareness();
    this.world.refreshSurfaceReactionAwareness();

    // this.world.timeWarp = 0.2;
  }

  public timeTick(dt: number): void {
    const timeBefore = getTime();

    this.world.calculatePhysics(dt);
    this.renderer.render();

    this.log(
      'Diff between frames: ' + dt.toFixed(3) + ' s\n' +
      'Physics/render time: ' + (getTime() - timeBefore).toFixed(3) + ' s\n'
    );
  }
}
