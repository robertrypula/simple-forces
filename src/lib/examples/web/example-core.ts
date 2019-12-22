// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { format, getTime, Renderer, World } from '@'; // in your code it would be: ... from 'simple-forces'

export abstract class ExampleCore {
  public world: World;
  public renderer: Renderer;

  protected constructor(public ctx: CanvasRenderingContext2D, public logElement: HTMLElement) {
    this.world = new World();
    this.renderer = new Renderer(this.ctx, this.world);
  }

  public abstract timeTick(dt: number): void;

  protected log(data: string): void {
    if (this.logElement) {
      this.logElement.innerHTML = data;
    }
  }

  protected timeTickWithLog(dt: number): string {
    const timeBefore = getTime();

    this.world.calculatePhysics(dt);
    this.renderer.render();

    return (
      'Diff between frames: ' +
      format(dt, 3) +
      ' s\n' +
      'Physics/render time: ' +
      format(getTime() - timeBefore, 3) +
      ' s\n'
    );
  }
}
