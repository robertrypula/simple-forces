// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { format, getTime, Renderer, World } from '@';

export abstract class AbstractExample {
  public world: World;
  public renderer: Renderer;

  protected constructor(public ctx: CanvasRenderingContext2D, public logElement: HTMLElement) {
    this.world = new World();
    this.renderer = new Renderer(this.ctx, this.world);
    this.createScene();
    this.world.refreshAwareness();
  }

  public abstract createScene(): void;

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
