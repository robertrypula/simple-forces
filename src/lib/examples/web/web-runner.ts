// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { CanvasRenderer, getTime } from '@';

import { AbstractExample } from '@examples/abstract-example';
import { DEFAULT_EXAMPLE_FPS } from '@examples/constants';
import { ExampleFactory } from '@examples/models';
import { getExampleExecutionDetails } from '@examples/tools';
import * as domUtils from '@examples/web/dom-utils';

export class WebRunner {
  protected example: AbstractExample;
  protected logElement: HTMLElement;
  protected canvasRenderer: CanvasRenderer;

  public constructor(protected exampleFactory: ExampleFactory) {
    domUtils.getByTagName('html').classList.add('web-runner');
    domUtils.getById('simple-forces-root').innerHTML = require('./web-runner.html');

    this.example = new exampleFactory();
    this.canvasRenderer = new CanvasRenderer(domUtils.getContext2dById('canvas'), this.example.world);
    this.logElement = domUtils.getById('log');

    document.addEventListener('keydown', (event: KeyboardEvent): void => this.example.keyboardEvent(event.code, true));
    document.addEventListener('keyup', (event: KeyboardEvent): void => this.example.keyboardEvent(event.code, false));

    1 ? this.animationFrame() : setTimeout(this.offlineExampleExecution.bind(this), 0); // TODO for development
  }

  public animationFrame(): void {
    const dt: number = 1 / DEFAULT_EXAMPLE_FPS; // const dt in order to keep simulation stable even on slower machines

    this.example.animationFrame(dt);
    this.canvasRenderer.render();
    this.log();

    window.requestAnimationFrame(this.animationFrame.bind(this));
  }

  protected offlineExampleExecution(): void {
    /*tslint:disable-next-line:no-console*/
    console.log(getExampleExecutionDetails(this.exampleFactory, null, 8));
  }

  protected log(): void {
    if (this.logElement) {
      this.logElement.innerHTML = this.example.log
        .map((logItem: [string, string]): string => logItem.join(': '))
        .join('\n');
    }
  }
}
