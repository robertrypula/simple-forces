// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

export const DEFAULT_ATMOSPHERE_END_ALTITUDE = 100e3;

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
