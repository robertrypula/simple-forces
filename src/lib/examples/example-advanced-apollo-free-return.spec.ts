// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

import { ExampleAdvancedApolloFreeReturn } from '@';

import { ExampleExecutionDetails } from '@examples/models';
import { getExampleExecutionDetails } from '@examples/tools';

describe('Advanced example - Apollo free return trajectory', (): void => {
  it('should properly calculate wheel position', (): void => {
    const exampleExecutionDetails: ExampleExecutionDetails = getExampleExecutionDetails(
      ExampleAdvancedApolloFreeReturn,
      (example: ExampleAdvancedApolloFreeReturn): string =>
        example.world.physics.time.toFixed(3) + 's: ' + example.apollo.center.position.toStringXY(),
      1,
      1
    );

    expect(exampleExecutionDetails.singleRunLog).toEqual(['0.017s: -6555399.999 -182.410']);
  });
});
