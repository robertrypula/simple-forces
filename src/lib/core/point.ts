// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Force } from '@core/force';
import { GravityForceSource } from '@core/forces/gravity';
import { SimplePoint } from '@core/simple-point';
import { World } from '@core/world';

export class Point {
  public forces: Force[] = [];
  public force: Complex = Complex.create();
  public acceleration: Complex = Complex.create();
  public positionToRender: Complex;
  public isStatic: boolean = false;
  public name: string;
  public gravityForceSource: GravityForceSource;
  public radius: number = null;

  public constructor(
    public world: World,
    public position: Complex = Complex.create(),
    public mass: number = 1,
    public velocity: Complex = Complex.create()
  ) {}

  public cloneAsSimplePoint(): SimplePoint {
    return new SimplePoint(this.position.clone(), this.velocity.clone());
  }

  public createGravityForceSource(): void {
    this.gravityForceSource = new GravityForceSource(this.world, this);
  }
}
