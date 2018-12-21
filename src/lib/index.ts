// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

export * from './version';

export * from './build-in-examples/example-001';
export * from './build-in-examples/example-core';
export * from './core/angle';
export * from './core/complex';
export * from './core/force';
export * from './core/forces/gravity';
export * from './core/forces/spring';
export * from './core/forces/surface-reaction';
export * from './core/forces/thrust';
export * from './core/line';
export * from './core/point';
export * from './core/simple-point';
export * from './core/visualization/renderer';
export * from './core/world';
export * from './tools';

/* TODO:
  + 0.20 kod tworenia obiektów do osobnego katalogu
  + 0.05 katalog utilities: getTime
  - 0.50 dodanie exampla appollo (pozwoli przetestować zmiany z nastepnego punktu)
  - 0.25 dev-* na demo-*
  - 1.00 fix na nieprzetwazanie tych samych sil

  - klawiszologia i przekazanie ich do example do dalszej analizy - klawisze w enumie
    - arrows: WSAD
    - functions: IKJL
    - change vessel: UO
    - zoom: ZX
    - camera move: TGFH and R refference (world, vessel and vesselInRelationToPoint)
    - timeWrap: ?

  - mozliwosc generowania obiektów:
    - box
    - koło
    - spaceship apollo
    - rocket
    - car

  - mozliwosc zmiany aktywnego pojazdu (example core), to zmieni też kamerę
  - wrapper na contextu2d i obiektu do loga
  - platforms: terminal, browser
*/
