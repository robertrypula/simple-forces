// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import {
} from '@'; // in your code it would be: ... from 'simple-forces'
import * as domUtils from '@examples/web/dom-utils';

export class Example000 {
  public constructor() {
    domUtils.getByTagName('html').classList.add('example-000');
    domUtils.getById('simple-forces-root').innerHTML = require('./example-000.html');
  }
}
