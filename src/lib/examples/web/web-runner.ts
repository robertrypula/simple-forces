// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { CanvasRenderer, getTime } from '@';

import { AbstractExample } from '@examples/abstract-example';
import * as domUtils from '@examples/web/dom-utils';

export class WebRunner {
  protected example: AbstractExample;
  protected logElement: HTMLElement;
  protected previousTime: number = null;
  protected canvasRenderer: CanvasRenderer;

  public constructor(protected exampleFactory: new () => AbstractExample) {
    domUtils.getByTagName('html').classList.add('web-runner');
    domUtils.getById('simple-forces-root').innerHTML = require('./web-runner.html');

    this.example = new exampleFactory();
    this.canvasRenderer = new CanvasRenderer(domUtils.getContext2dById('canvas'), this.example.world);
    this.logElement = domUtils.getById('log');

    this.animationFrame();
  }

  public animationFrame(): void {
    const currentTime = getTime();
    let dt = this.previousTime === null ? 0 : currentTime - this.previousTime;

    dt = 0.016; // TODO only in development, constant delta between animation frames
    this.example.animationFrame(dt);
    this.canvasRenderer.render();
    this.log();

    this.previousTime = currentTime;
    window.requestAnimationFrame(this.animationFrame.bind(this));
  }

  protected log(): void {
    if (this.logElement) {
      this.logElement.innerHTML = this.example.log.map(logItem => logItem.join(': ')).join('\n');
    }
  }
}
