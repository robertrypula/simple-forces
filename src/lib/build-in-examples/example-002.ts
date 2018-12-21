// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Complex, getTime, Point } from '..';
import { Axis } from '../objects/axis';
import { Earth } from '../objects/earth';
import { Moon } from '../objects/moon';
import { ExampleCore } from './example-core';

export class Example002 extends ExampleCore {
  public axis: Axis;
  public earth: Earth;
  public moon: Moon;

  public apollo: Point;
  public iss: Point;

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
    this.moon.orbitAroundEarthAtOrigin(-53);

    this.createSpacecrafts();

    this.world.refreshGravityAwareness();
    this.world.refreshSurfaceReactionAwareness();

    this.world.internalSteps = 10000;
    this.renderer.zoom = 0.000001 * 1.5;
    // this.renderer.zoom = 0.00001 * 1.5;
    this.world.timeWarp = 3600 * 24;
    this.world.timeWarp = 60 * 60;
  }

  public createSpacecrafts(): void {
    this.iss = this.world.createPoint(Complex.create(0, Earth.RADIUS + 400e3), 419725, Complex.create(-7.66e3, 0));
    this.apollo = this.world.createPoint(Complex.create(-(Earth.RADIUS + 400e3), 0), 1, Complex.create(0, -10.764e3));
  }

  public timeTick(dt: number): void {
    const timeBefore = getTime();

    this.world.calculatePhysics(dt);
    this.renderer.render();

    this.log(
      'Diff between frames:' + dt.toFixed(3) + 's\n' +
      'Physics/render time: ' + (getTime() - timeBefore).toFixed(3) + 's\n' +
      'Moon Distance: ' + (this.moon.center.position.getMagnitude() / 1e6).toFixed(2) + '\n' +
      'Moon Position: ' +
      (this.moon.center.position.x / 1e6).toFixed(2) + ' ' + (this.moon.center.position.y / 1e6).toFixed(2) + '\n' +
      'Moon velocity: ' +
      (this.moon.center.velocity.x / 1e6).toFixed(2) + ' ' + (this.moon.center.velocity.y / 1e6).toFixed(2)
    );
  }
}
