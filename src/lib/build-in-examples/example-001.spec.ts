// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Example001 } from './example-001';

describe('Example 001 - falling ball', () => {
  let example: Example001;

  beforeEach(() => {
    example = new Example001(null, null);
  });

  it('should', () => {
    console.log(example.ball.position.toStringXY());
    example.timeTick(0.016);
    console.log(example.ball.position.toStringXY());
  });
});
