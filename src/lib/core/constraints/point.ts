// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Force } from '@core/force';
import { DragForceSource } from '@core/forces/drag';
import { GravityForceSource } from '@core/forces/gravity';
import { SimplePoint } from '@core/simple-point';
import { World } from '@core/world';

export class Point {
  public acceleration: Complex = Complex.create();
  public force: Complex = Complex.create();
  public forces: Force[] = [];

  public isStatic = false;
  public skipCalculationOfDrag = false; // TODO use flags in calculateForce() or at loop that calls it
  public skipCalculationOfGravity = false; // TODO use flags in calculateForce() or at loop that calls it
  public skipCalculationOfLiftAndDrag = false; // TODO use flags in calculateForce() or at loop that calls it
  public skipCalculationOfReactionAndFriction = false; // TODO use flags in calculateForce() or at loop that calls it

  public name: string;
  public radius: number = null;

  public positionToRender: Complex;

  public dragForceSource: DragForceSource;
  public gravityForceSource: GravityForceSource;

  public constructor(
    public world: World,
    public position: Complex = Complex.create(),
    public mass: number = 1,
    public velocity: Complex = Complex.create()
  ) {}

  public cloneAsSimplePoint(): SimplePoint {
    return new SimplePoint(this.position.clone(), this.velocity.clone());
  }

  public createDragForceSource(): void {
    this.dragForceSource = new DragForceSource(this.world, this);
  }

  public createGravityForceSource(): void {
    this.gravityForceSource = new GravityForceSource(this.world, this);
  }
}
