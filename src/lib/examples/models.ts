// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

import { AbstractExample } from '@examples/abstract-example';

export interface ExampleExecutionDetails {
  runTime: {
    average: number;
    max: number;
    min: number;
  };
  runTimes: number[];
  singleRunLog: string[];
}

export type ExampleFactory = new () => AbstractExample;
