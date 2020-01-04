// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

// internal

export const DEFAULT_ATMOSPHERE_END_ALTITUDE = 100e3;

export const DEFAULT_PHYSICS_INTERNAL_STEPS = 100;

export const DEFAULT_POINT_MASS = 1;
export const DEFAULT_POINT_SCREEN_RADIUS = 1;

export const DEFAULT_SPRING_AND_DAMPER_B_COEFFICIENT = 20; // 1;
export const DEFAULT_SPRING_AND_DAMPER_K_COEFFICIENT = 10000; // 200;

export const DEFAULT_SURFACE_BOUNDING_BOX = 0.35;
export const DEFAULT_SURFACE_FRICTION_B_COEFFICIENT = 0.2;
export const DEFAULT_SURFACE_REACTION_B_COEFFICIENT = 20;
export const DEFAULT_SURFACE_REACTION_K_COEFFICIENT = 10000;

export const DEFAULT_VIEWPORT_METERS_PER_WIDTH = 15;

// -----------------------------------------------------------------------------

// nature constants

export const GRAVITATIONAL_CONSTANT = 6.674e-11; // https://en.wikipedia.org/wiki/Gravitational_constant
export const SPEED_OF_LIGHT = 299792458; // https://en.wikipedia.org/wiki/Speed_of_light
export const STANDARD_GRAVITY = 9.80665; // https://en.wikipedia.org/wiki/Standard_gravity

// -----------------------------------------------------------------------------

// natural objects
// - planets vectors https://ssd.jpl.nasa.gov/horizons.cgi
// - might help in calculating orbital speeds: https://en.wikipedia.org/wiki/Orbital_speed

export const EARTH_MASS = 5.9722e24; // https://en.wikipedia.org/wiki/Earth_mass
export const EARTH_MEAN_RADIUS = 6371e3; // https://en.wikipedia.org/wiki/Earth_radius -> 'Mean radius' section

export const MOON_MASS = 7.342e22; // https://en.wikipedia.org/wiki/Moon
export const MOON_MEAN_RADIUS = 1737.4e3;
export const MOON_PERIGEE_ALTITUDE = 362.6e6;
export const MOON_PERIGEE_VELOCITY = 1077.2; // TODO fine-tune velocity

// -----------------------------------------------------------------------------

// spacecrafts

export const INTERNATIONAL_SPACE_STATION_MASS = 419725; // https://en.wikipedia.org/wiki/International_Space_Station
export const INTERNATIONAL_SPACE_STATION_PERIGEE_VELOCITY = 7.66e3; // TODO fine-tune velocity
export const INTERNATIONAL_SPACE_STATION_APOGEE_VELOCITY = 7.66e3; // TODO fine-tune velocity
export const INTERNATIONAL_SPACE_STATION_PERIGEE_ALTITUDE = 408e3;
export const INTERNATIONAL_SPACE_STATION_APOGEE_ALTITUDE = 410e3;

export const APOLLO_MASS = 5621 + 23250; // https://en.wikipedia.org/wiki/Apollo_8
export const APOLLO_PERIGEE_ALTITUDE = 184.4e3;
export const APOLLO_PERIGEE_VELOCITY = 7.793e3; // TODO fine-tune velocity, wiki says 7.6e3 m/s
export const APOLLO_PERIGEE_TLI_VELOCITY = 10.944605e3; // TODO fine-tune velocity, wiki says 10.8e3 m/s
