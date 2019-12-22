// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex, Line, Point, World } from '..';
import { ObjectCore } from './object-core';

export class Spacecraft extends ObjectCore {
  public constructor(world: World) {
    super(world);
    this.create();
  }

  protected create(): void {

  }
}
