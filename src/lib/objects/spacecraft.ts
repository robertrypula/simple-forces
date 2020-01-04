// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

import { ObjectCore } from '@core/object-core';
import { World } from '@core/world';

export class Spacecraft extends ObjectCore {
  public constructor(world: World) {
    super(world);
    this.create();
  }

  /*tslint:disable-next-line:no-empty*/
  protected create(): void {}
}
