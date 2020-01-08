// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

import { ExampleAdvancedApolloFreeReturn } from '@';

import { ExampleExecutionDetails } from '@examples/models';
import { getExampleExecutionDetails } from '@examples/tools';

describe('Advanced example - Apollo free return trajectory', (): void => {
  it('should properly calculate wheel position', (): void => {
    const exampleExecutionDetails: ExampleExecutionDetails = getExampleExecutionDetails(
      ExampleAdvancedApolloFreeReturn,
      (example: ExampleAdvancedApolloFreeReturn): string =>
        example.world.physics.time.toFixed(3) + 's: ' + example.apollo.center.position.toStringXY()
    );

    expect(exampleExecutionDetails.singleRunLog).toEqual([
      '0.017s: -6555399.999 -182.410',
      '30.017s: -6551223.257 -328450.816',
      '60.017s: -6538723.028 -656302.202',
      '90.017s: -6517961.013 -983324.878',
      '120.017s: -6489038.564 -1309117.225',
      '150.017s: -6452094.568 -1633292.301',
      '180.017s: -6407302.621 -1955481.976',
      '210.017s: -6354867.614 -2275340.464',
      '240.017s: -6295021.904 -2592547.200',
      '270.017s: -6228021.188 -2906809.003',
      '300.017s: -6154140.255 -3217861.531',
      '330.017s: -6073668.751 -3525470.053',
      '360.017s: -5986907.070 -3829429.590',
      '390.017s: -5894162.479 -4129564.494',
      '420.017s: -5795745.558 -4425727.559'
    ]);
  });
});
