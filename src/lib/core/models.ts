// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

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

  // adds local thrust vector to the line's reference frame
  Thrust = 'Thrust'
}
