// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { POINT_DEFAULT_SCREEN_RADIUS } from '@core/constants';
import { Force } from '@core/force';
import { DragForceSource } from '@core/forces/drag';
import { GravityForceSource } from '@core/forces/gravity';
import { LiftAndDragForceSource } from '@core/forces/lift-and-drag';
import { RadiusType, RendererData } from '@core/models';
import { SimplePoint } from '@core/simple-point';
import { World } from '@core/world';

export class Point {
  public acceleration: Complex = Complex.create();
  public force: Complex = Complex.create();
  public forces: Force[] = [];

  public isStatic = false;
  public isNotAffectedByDrag = false; // TODO use flag in calculateForce() or at loop that calls it
  public isNotAffectedByGravity = false; // TODO use flag in calculateForce() or at loop that calls it
  public isNotAffectedByLiftAndDrag = false; // TODO use flag in calculateForce() or at loop that calls it
  public isNotAffectedByReactionAndFriction = false; // TODO use flag in calculateForce() or at loop that calls it

  public name: string;
  public radius: number = POINT_DEFAULT_SCREEN_RADIUS;
  public radiusType: RadiusType = RadiusType.Screen;

  public rendererData: RendererData = {
    // colorIndex: 0,
    position: Complex.create(),
    radius: 0
  };

  public dragForceSource: DragForceSource;
  public gravityForceSource: GravityForceSource;
  public liftAndDragForceSource: LiftAndDragForceSource;

  public constructor(
    public world: World,
    public position: Complex = Complex.create(),
    public mass: number = 1,
    public velocity: Complex = Complex.create()
  ) {}

  public cloneAsSimplePoint(): SimplePoint {
    return new SimplePoint(this.position.clone(), this.velocity.clone());
  }

  public createDragForceSource(): Point {
    this.dragForceSource = new DragForceSource(this.world, this);

    return this;
  }

  public createGravityForceSource(): Point {
    this.gravityForceSource = new GravityForceSource(this.world, this);

    return this;
  }

  public createLiftAndDragForceSource(): Point {
    this.liftAndDragForceSource = new LiftAndDragForceSource(this.world, this);

    return this;
  }
}
