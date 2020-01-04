// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { DEFAULT_VIEWPORT_METERS_PER_WIDTH } from '@core/constants';
import { Line } from '@core/constraints-hosts/line';
import { Point } from '@core/constraints-hosts/point';
import { RadiusType } from '@core/models';

export class Viewport {
  public camera: Point | Line;
  public height = 1;
  public width = 1;
  public zoom = 1;
  public metersPerWidth: number = DEFAULT_VIEWPORT_METERS_PER_WIDTH;

  public constructor(protected points: Point[]) {}

  public calculate(): void {
    const viewportCenter: Complex = Complex.create(this.width / 2, this.height / 2);
    const scale: number = (this.width / this.metersPerWidth) * this.zoom;
    let cameraPosition: Complex;
    let rotation: Complex;

    if (!this.camera) {
      cameraPosition = Complex.create();
      rotation = Complex.createPolar();
    } else if (this.camera instanceof Line) {
      const unitAngle = this.camera.getUnitAngle();

      cameraPosition = this.camera.pointA.position;
      rotation = Complex.createPolar(-unitAngle);
    } else {
      cameraPosition = this.camera.position;
      rotation = Complex.createPolar();
    }

    this.points.forEach((point: Point) => {
      switch (point.radiusType) {
        case RadiusType.Real:
          point.rendererData.radius = point.radius * scale;
          break;
        case RadiusType.Screen:
          point.rendererData.radius = point.radius;
          break;
      }

      point.rendererData.position = viewportCenter.clone().add(
        point.position
          .clone()
          .subtract(cameraPosition)
          .multiply(rotation)
          .multiplyScalar(scale)
          .conjugate()
      );
    });
  }
}
