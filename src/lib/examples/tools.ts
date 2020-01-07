// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

import { AbstractExample } from '@examples/abstract-example';
import { DEFAULT_EXAMPLE_FPS } from '@examples/constants';
import { ExampleExecutionDetails } from '@examples/models';
import { getTime } from '@shared/tools';

export const getExampleExecutionDetails = <T extends AbstractExample>(
  exampleFactory: new () => T,
  logHandler: (example: T) => string = null,
  runs = 1,
  seconds = 15,
  fps = DEFAULT_EXAMPLE_FPS
): ExampleExecutionDetails => {
  const dt: number = 1 / fps;
  const timeStart: number = getTime();
  const exampleExecutionDetails: ExampleExecutionDetails = {
    runTime: {
      average: null,
      max: null,
      min: null
    },
    runTimes: [],
    singleRunLog: []
  };

  for (let run = 0; run < runs; run++) {
    const timeSubStart: number = getTime();
    const example: T = new exampleFactory();

    for (let second = 0; second < seconds; second++) {
      for (let frame = 0; frame < fps; frame++) {
        example.animationFrame(dt);

        run === 0 && frame === 0 && logHandler && exampleExecutionDetails.singleRunLog.push(logHandler(example));
      }
    }
    exampleExecutionDetails.runTimes.push(getTime() - timeSubStart);
  }
  exampleExecutionDetails.runTime.average = (getTime() - timeStart) / runs;
  exampleExecutionDetails.runTime.max = Math.max(...exampleExecutionDetails.runTimes);
  exampleExecutionDetails.runTime.min = Math.min(...exampleExecutionDetails.runTimes);

  return exampleExecutionDetails;
};
