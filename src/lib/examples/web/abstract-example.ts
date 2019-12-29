// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { formatNumber, formatTime, getTime, Renderer, World } from '@';

export abstract class AbstractExample {
  public renderer: Renderer;
  public world: World;

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
    let timePhysicsBefore: number;
    let timePhysics: number;
    let timeRenderBefore: number;
    let timeRender: number;

    timePhysicsBefore = getTime();
    this.world.animationFrame(dt);
    timePhysics = getTime() - timePhysicsBefore;

    timeRenderBefore = getTime();
    this.renderer.render();
    timeRender = getTime() - timeRenderBefore;

    return (
      'Simulation time: ' +
      formatTime(this.world.time) +
      '\n' +
      'Simulation time between frames: ' +
      formatTime(this.world.timeWarp * dt) +
      '\n' +
      'Time between frames: ' +
      formatNumber(dt, 3) +
      's\n' +
      'Physics/render time: ' +
      formatNumber(timePhysics, 3) +
      's ' +
      formatNumber(timeRender, 3) +
      's\n'
    );
  }
}
