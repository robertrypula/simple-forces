// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

import { ExampleAdvancedWheel } from '@';

import { ExampleExecutionDetails } from '@examples/models';
import { getExampleExecutionDetails } from '@examples/tools';

describe('Advanced example - wheel', (): void => {
  it('should properly calculate wheel position', (): void => {
    const exampleExecutionDetails: ExampleExecutionDetails = getExampleExecutionDetails(
      ExampleAdvancedWheel,
      (example: ExampleAdvancedWheel): string =>
        example.world.physics.time.toFixed(3) + 's: ' + example.wheel.center.position.toStringXY(),
      1,
      2
    );

    expect(exampleExecutionDetails.singleRunLog).toEqual(['0.017s: 2.000 2.999', '1.017s: 1.269 2.157']);
  });
});
