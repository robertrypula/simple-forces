// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Renderer, World } from '..';

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

  protected log(data: string): void {
    this.logElement.innerHTML = data;
  }
}
