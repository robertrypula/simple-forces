// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Force } from '..';
import { GravityForceManager } from '..';
import { Complex } from './complex';
import { SimplePoint } from './simple-point';
import { World } from './world';

export class Point {
  public forces: Force[] = [];
  public force: Complex = Complex.create();
  public acceleration: Complex = Complex.create();
  public positionToRender: Complex;
  public isStatic: boolean = false;
  public name: string;
  public gravityForceManager: GravityForceManager;

  public constructor(
    public world: World,
    public position: Complex = Complex.create(),
    public mass: number = 1,
    public velocity: Complex = Complex.create()
  ) {}

  public cloneAsSimplePoint(): SimplePoint {
    return new SimplePoint(
      this.position.clone(),
      this.velocity.clone()
    );
  }

  public createGravityForce(): void {
    this.gravityForceManager = new GravityForceManager(this.world, this);
  }
}
