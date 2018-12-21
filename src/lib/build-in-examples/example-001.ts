// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Complex, getTime, Line } from '..';
import { Axis } from '../objects/axis';
import { Earth } from '../objects/earth';
import { ExampleCore } from './example-core';

export class Example001 extends ExampleCore {
  public rodSurface: Line;
  public earth: Earth;
  public axis: Axis;

  public constructor(
    ctx: CanvasRenderingContext2D,
    logElement: HTMLElement
  ) {
    super(ctx, logElement);
    this.createScene();
  }

  public createScene(): void {
    this.earth = new Earth(this.world);
    this.axis = new Axis(this.world);

    this.createBoxWithLine();

    this.world.refreshGravityAwareness();
    this.world.refreshSurfaceReactionAwareness();
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
    const ball = this.world.createPoint(Complex.create(-0.1, -0.1), 1, Complex.create(0.6, -0.6));

    this.rodSurface = this.world.createLine(rodA, rodB);

    rodA.name = 'rodA';
    rodB.name = 'rodB';
    ball.name = 'ball';
    this.rodSurface.name = 'rodSurface';

    this.rodSurface.createSpringForce();
    // this.rodSurface.createSurfaceReactionForce();
  }

  public timeTick(dt: number): void { // TODO move to core class
    const timeBefore = getTime();

    this.world.calculatePhysics(dt);
    this.renderer.render();

    this.log(
      dt.toFixed(3) + '\n' +
      (getTime() - timeBefore).toFixed(3) + '\n'
    );
  }
}
