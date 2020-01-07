// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

import { ExampleAdvancedWheel } from '@';

import { ExampleExecutionDetails } from '@examples/models';
import { getExampleExecutionDetails } from '@examples/tools';

describe('Advanced example - wheel', (): void => {
  it('should properly calculate wheel position', (): void => {
    const exampleExecutionDetails: ExampleExecutionDetails = getExampleExecutionDetails(
      ExampleAdvancedWheel,
      (example: ExampleAdvancedWheel): string =>
        example.world.physics.time.toFixed(3) + 's: ' + example.wheel.center.position.toStringXY()
    );

    expect(exampleExecutionDetails.singleRunLog).toEqual([
      '0.017s: 2.000 2.999',
      '1.017s: 1.269 2.157',
      '2.017s: -1.008 1.058',
      '3.017s: -4.006 -0.241',
      '4.017s: -2.011 -0.511',
      '5.017s: -2.035 -0.197',
      '6.017s: -4.041 -0.373',
      '7.017s: -2.314 -0.459',
      '8.017s: -2.052 -0.437',
      '9.017s: -2.199 -0.542',
      '10.017s: -2.980 -0.529',
      '11.017s: -3.751 -0.531',
      '12.017s: -3.830 -0.544',
      '13.017s: -3.577 -0.531',
      '14.017s: -3.328 -0.530'
    ]);
  });
});
