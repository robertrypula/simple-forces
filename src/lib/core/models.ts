// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Line } from '@core/constraints-hosts/line';
import { Point } from '@core/constraints-hosts/point';

export enum ForceType {
  // adds 'atmosphere' area that affects points above the 'source' point
  Drag = 'Drag',

  // adds force that pulls other points towards one source point
  Gravity = 'Gravity',

  // keeps defined min/max angle between two lines, adds 'circular' force between floating ends of two connected lines
  JointAndTorque = 'JointAndTorque',

  // adds 'atmosphere' area that affects lines above the 'source' point
  LiftAndDrag = 'LiftAndDrag',

  // works on lines - models surface reaction and friction forces
  ReactionAndFriction = 'ReactionAndFriction',

  // adds force that keeps the distance between two points
  SpringAndDamper = 'SpringAndDamper',

  // adds local thrust vectors to the line's reference frame
  Thrust = 'Thrust'
}

export enum RadiusType {
  Real = 'Real',
  Screen = 'Screen'
}

export interface RendererData {
  radius: number;
  position: Complex;
}

export type NotYetAwarePointHandler = (point: Point) => void;
export type NotYetAwareLineHandler = (line: Line) => void;
