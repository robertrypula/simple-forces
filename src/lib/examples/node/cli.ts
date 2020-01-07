// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

import { ExampleAdvancedWheel } from '@examples/example-advanced-wheel';
import { ExampleExecutionDetails } from '@examples/models';
import { getExampleExecutionDetails } from '@examples/tools';

export class CliNodeExample {
  public constructor() {
    const exampleExecutionDetails: ExampleExecutionDetails = getExampleExecutionDetails(
      ExampleAdvancedWheel,
      (example: ExampleAdvancedWheel): string =>
        example.world.physics.time.toFixed(3) + 's: ' + example.wheel.center.position.toStringXY()
    );

    /*tslint:disable-next-line:no-console*/
    console.log(exampleExecutionDetails);
  }
}
