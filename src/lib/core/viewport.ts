// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Line } from '@core/constraints/line';
import { Point } from '@core/constraints/point';

export class Viewport {
  public camera: Point | Line;
  public height: number;
  public width: number;
  public zoom: number = 1;
  public metersPerWidth: number = 15; // unit: m / pix

  public scale = 1;

  public constructor(protected points: Point[]) {}

  public calculate(): void {
    const viewportCenter = Complex.create(this.width / 2, this.height / 2);
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

    this.scale = (this.width / this.metersPerWidth) * this.zoom;

    this.points.forEach((point: Point) => {
      point.positionToRender = viewportCenter.clone().add(
        point.position
          .clone()
          .subtract(cameraPosition)
          .multiply(rotation)
          .multiplyScalar(this.scale)
          .conjugate()
      );
    });
  }
}
