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
export * from '@core/forces/gravity';
export * from '@core/forces/spring';
export * from '@core/forces/surface-reaction';
export * from '@core/forces/thrust';
export * from '@core/line';
export * from '@core/point';
export * from '@core/simple-point';
export * from '@core/world';
export * from '@objects/apollo';
export * from '@objects/axis';
export * from '@objects/earth';
export * from '@objects/iss';
export * from '@objects/moon';
export * from '@objects/object-core';
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

  + 0.20 kod tworenia obiektów do osobnego katalogu
  + 0.05 katalog utilities: getTime
  + 0.50 dodanie exampla appollo (pozwoli przetestować zmiany z nastepnego punktu)
  + 0.25 dev-* na demo-*

  - klawiszologia i przekazanie ich do example do dalszej analizy - klawisze w enumie
    - arrows: WSAD
    - functions: IKJL
    - change vessel: UO
    - zoom: ZX
    - camera move: TGFH and R refference (world, vessel and vesselInRelationToPoint)
    - timeWrap: ?

  - mozliwosc generowania obiektów:
    - box
    + koło
    - spaceship apollo
    - rocket
    - car

  - mozliwosc zmiany aktywnego pojazdu (example core), to zmieni też kamerę
  - 1.00 fix na nieprzetwazanie tych samych sil
  - wrapper na contextu2d i obiektu do loga
  - platforms: terminal, browser
*/
