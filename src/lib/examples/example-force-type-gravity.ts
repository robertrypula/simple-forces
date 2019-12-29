// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { Point } from '@';

import { AbstractEarthSurfaceExample } from '@examples/abstract-example-earth-surface';

export class ExampleForceTypeGravity extends AbstractEarthSurfaceExample {
  public ball: Point;

  public animationFrame(dt: number): void {
    super.animationFrame(dt);
    this.log = [
      ...this.log,
      ['Ball position', this.ball.position.toStringXY()],
      ['Ball velocity', this.ball.velocity.toStringXY()],
      ['Ball acceleration', this.ball.acceleration.toStringXY(3)]
    ];
  }

  public createScene(): void {
    this.createEarthSurfaceEnvironment();

    this.ball = this.world.createPoint();
  }
}
