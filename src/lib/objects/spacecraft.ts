// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { World } from '@core/world';
import { ObjectCore } from '@objects/object-core';

export class Spacecraft extends ObjectCore {
  public constructor(world: World) {
    super(world);
    this.create();
  }

  protected create(): void {

  }
}
