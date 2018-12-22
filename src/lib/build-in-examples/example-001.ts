// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Complex, getTime, Line, Point } from '..';
import { Axis } from '../objects/axis';
import { Earth } from '../objects/earth';
import { ExampleCore } from './example-core';

export class Example001 extends ExampleCore {
  public rodSurface: Line;
  public axis: Axis;
  public earth: Earth;

  public ball: Point;

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

    this.axis = new Axis(this.world);

    this.createBoxWithLine();

    this.world.refreshGravityAwareness();
    this.world.refreshSurfaceReactionAwareness();

    // this.world.timeWarp = 0.1;
  }

  public createBoxWithLine(): void {
    const leftBottom = this.world.createPoint(Complex.create(-1.2, -0.8));
    const rightBottom = this.world.createPoint(Complex.create(1.7, -0.8));
    const leftTop = this.world.createPoint(Complex.create(-1.2, 0.8));
    const rightTop = this.world.createPoint(Complex.create(1.4, 0.65));

    leftBottom.isStatic = true;
    rightBottom.isStatic = true;
    leftTop.isStatic = true;
    rightTop.isStatic = true;

    const bottom = this.world.createLine(leftBottom, rightBottom);
    bottom.createSurfaceReactionForce();

    const left = this.world.createLine(leftTop, leftBottom);
    left.createSurfaceReactionForce();

    const right = this.world.createLine(rightBottom, rightTop);
    right.createSurfaceReactionForce();

    const top = this.world.createLine(rightTop, leftTop);
    top.createSurfaceReactionForce();

    const rodA = this.world.createPoint(Complex.create(-0.6, -0.4), 1, Complex.create(0.05, 0.45));
    const rodB = this.world.createPoint(Complex.create(0.1, -0.6), 1, Complex.create(-0.05, 0.25));
    this.ball = this.world.createPoint(Complex.create(-0.03, 0.0), 1, Complex.create(0.0, 0.0));

    this.rodSurface = this.world.createLine(rodA, rodB);

    rodA.name = 'rodA';
    rodB.name = 'rodB';
    this.ball.name = 'ball';
    this.rodSurface.name = 'rodSurface';

    this.rodSurface.createSpringForce();
    // this.rodSurface.createSurfaceReactionForce();
  }

  public timeTick(dt: number): void {
    const timeBefore = getTime();

    this.world.calculatePhysics(dt);
    this.renderer.render();

    this.log(
      'Diff between frames: ' + dt.toFixed(3) + ' s\n' +
      'Physics/render time: ' + (getTime() - timeBefore).toFixed(3) + ' s\n' +
      'Ball position: ' + this.ball.position.x.toFixed(3) + ' ' + this.ball.position.y.toFixed(3)
    );
  }
}
