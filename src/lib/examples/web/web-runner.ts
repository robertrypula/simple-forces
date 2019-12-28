// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { getTime } from '@';

import { AbstractExample } from '@examples/web/abstract-example';
import * as domUtils from '@examples/web/dom-utils';

export class WebRunner {
  protected example: AbstractExample;
  protected previousTime: number = null;

  public constructor(protected ExampleFactory: any) {
    // TODO refactor 'any'
    domUtils.getByTagName('html').classList.add('web-runner');
    domUtils.getById('simple-forces-root').innerHTML = require('./web-runner.html');
    this.example = new ExampleFactory(domUtils.getContext2dById('canvas'), domUtils.getById('log'));
    this.animationFrame();
  }

  public animationFrame(): void {
    const currentTime = getTime();
    let dt = this.previousTime === null ? 0 : currentTime - this.previousTime;

    dt = 0.016; // TODO only in development, constant delta
    this.example.timeTick(dt);

    this.previousTime = currentTime;
    window.requestAnimationFrame(this.animationFrame.bind(this));
  }
}
