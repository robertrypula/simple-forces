// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Complex, Renderer, World } from '..';

const EARTH_RADIUS = 6378100;
const EARTH_MASS = 5.97219e24;

export abstract class ExampleCore {
  public world: World;
  public renderer: Renderer;

  protected constructor(
    public ctx: CanvasRenderingContext2D,
    public logElement: HTMLElement
  ) {
    this.world = new World();
    this.renderer = new Renderer(this.ctx, this.world);
  }

  public createAxis(): void {
    const pZero = this.world.createPoint();
    const pAxisY = this.world.createPoint(Complex.create(0.0, 0.5));
    const pAxisX = this.world.createPoint(Complex.create(0.5, 0.0));

    const axisXLine = this.world.createLine(pZero, pAxisX);
    const axisYLine = this.world.createLine(pZero, pAxisY);

    pZero.isStatic = true;
    pAxisX.isStatic = true;
    pAxisY.isStatic = true;
  }

  public createEarth(): void {
    const earth = this.world.createPoint(Complex.create(0, -EARTH_RADIUS), EARTH_MASS);

    earth.name = 'Earth';
    earth.isStatic = true;
    earth.createGravityForce();
  }

  public getTime(): number {
    return (new Date().getTime()) / 1000;
  }

  public log(data: string): void {
    this.logElement.innerHTML = data;
  }
}
