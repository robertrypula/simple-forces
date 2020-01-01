// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { Complex, Line } from '@';

import { AbstractExample } from '@examples/abstract-example';

export class ExampleForceTypeThrust extends AbstractExample {
  public line: Line;

  public animationFrame(dt: number): void {
    super.animationFrame(dt);
    this.log = [...this.log, [': ', ':'], ['Keyboard keys', 'Use WSAD and QE to move the line']];
  }

  public createScene(): void {
    this.line = this.world.createLine(
      this.world.createPoint(Complex.create(-1, 0), 1),
      this.world.createPoint(Complex.create(1, 0), 1)
    );

    this.line.createThrustForceSource();
    this.line.createSpringAndDamperForceSource();
  }

  public keyboardEvent(key: string, isPressed: boolean): void {
    super.keyboardEvent(key, isPressed);

    switch (key) {
      case 'KeyW':
        this.line.thrustForceSource.localVectorA = Complex.create(0, isPressed ? 1 : 0);
        this.line.thrustForceSource.localVectorB = Complex.create(0, isPressed ? 1 : 0);
        break;
      case 'KeyS':
        this.line.thrustForceSource.localVectorA = Complex.create(0, isPressed ? -1 : 0);
        this.line.thrustForceSource.localVectorB = Complex.create(0, isPressed ? -1 : 0);
        break;
      case 'KeyA':
        this.line.thrustForceSource.localVectorA = Complex.create(isPressed ? -1 : 0);
        this.line.thrustForceSource.localVectorB = Complex.create(isPressed ? -1 : 0);
        break;
      case 'KeyD':
        this.line.thrustForceSource.localVectorA = Complex.create(isPressed ? 1 : 0);
        this.line.thrustForceSource.localVectorB = Complex.create(isPressed ? 1 : 0);
        break;
      case 'KeyQ':
        this.line.thrustForceSource.localVectorA = Complex.create(0, isPressed ? -1 : 0);
        this.line.thrustForceSource.localVectorB = Complex.create(0, isPressed ? 1 : 0);
        break;
      case 'KeyE':
        this.line.thrustForceSource.localVectorA = Complex.create(0, isPressed ? 1 : 0);
        this.line.thrustForceSource.localVectorB = Complex.create(0, isPressed ? -1 : 0);
        break;
    }
  }
}
