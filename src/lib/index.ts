// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

export const libraryInfo = {
  author: 'Robert Rypuła',
  gitHub: 'https://github.com/robertrypula/simple-forces',
  version: '0.1.0-rc1'
};

// ----------------------------------------------------------------------------

export * from '@core/angle';
export * from '@core/complex';
export * from '@core/force';
export * from '@core/forces/drag';
export * from '@core/forces/gravity';
export * from '@core/forces/reaction-and-friction';
export * from '@core/forces/spring-and-damper';
export * from '@core/forces/thrust';
export * from '@core/line';
export * from '@core/object-core';
export * from '@core/point';
export * from '@core/simple-point';
export * from '@core/world';
export * from '@objects/apollo';
export * from '@objects/axis';
export * from '@objects/earth';
export * from '@objects/iss';
export * from '@objects/moon';
export * from '@objects/spacecraft';
export * from '@objects/wheel';
export * from '@shared/tools';
export * from '@visualization/renderer';

// ----------------------------------------------------------------------------

import '@examples/web/index.scss';

export * from '@examples/node/cli';
export * from '@examples/web/example-001';
export * from '@examples/web/example-002';
export * from '@examples/web/example-003';
export * from '@examples/web/example-004';
export * from '@examples/web/example-005';
export * from '@examples/web/web-runner';

// ----------------------------------------------------------------------------

import { CliNodeExample } from '@examples/node/cli';
import { argc, argv, isNode } from '@shared/environment-utils';

let cliNodeExample: CliNodeExample;

// I hope that 'simpleForces.run.nodeExample' argument will never collide
// with some other node project that will use my library... :)
if (isNode && argc >= 3 && argv[2] === 'simpleForces.run.nodeExample') {
  cliNodeExample = new CliNodeExample();
}

// ----------------------------------------------------------------------------

/*
  TODO:

  + 0.20 separate dir for objects
  + 0.05 utilities: getTime
  + 0.50 Apollo example
  + 0.25 dev-* na demo-*

  - ability to control via keyboard
    - arrows: WSAD
    - functions: IKJL
    - change vessel: UO
    - zoom: ZX
    - camera move: TGFH and R reference (world, vessel and vesselInRelationToPoint)
    - timeWrap: ?

  - ability to generate objects:
    - box
    + wheel
    - spaceship apollo
    - rocket
    - car

  - ability to switch active vessel, it should also switch the camera
  - fix for not calculating the same force twice (for example gravity between moon and earth)
  - wrapper for context2d i and log
  - platforms: terminal, browser

  TODO 2019.12
  - move actual rendering on Canvas to web-runner
  - move log to web-runner
  - 1 unit of zoom is filling viewport width
  - timeTick will be refactored as animationFrame(dt, width, aspectRatio)
  - point will have 'viewportPoint' member with:
    - radius
    - position
  - world will do computation for dataToRender
    - shader will go to world
  - example can provide dataToRender and log values (key, value)

  - https://dzone.com/articles/importing-scripts-web-workers
  - https://stackoverflow.com/questions/38715001/how-to-make-web-workers-with-typescript-and-webpack
*/
