// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Line } from '@core/constraints/line';
import { Point } from '@core/constraints/point';
import { World } from '@core/world';

export class Renderer {
  public zoom: number = 110;
  public camera: Line | Point;

  public constructor(protected ctx: CanvasRenderingContext2D, protected world: World) {}

  public render(): void {
    if (!this.ctx) {
      return;
    }

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.vertexShader();
    this.renderLines();
    this.renderPoints();
  }

  protected renderLines(): void {
    this.world.lines.forEach((line: Line) => {
      const pA = line.pointA.positionToRender;
      const pB = line.pointB.positionToRender;

      this.ctx.beginPath();
      this.ctx.moveTo(pA.x, pA.y);
      this.ctx.lineTo(pB.x, pB.y);
      this.ctx.strokeStyle = '#a4aab0';
      this.ctx.stroke();
    });
  }

  protected renderPoints(): void {
    this.world.points.forEach((point: Point) => {
      const p = point.positionToRender;
      const radius = point.radius !== null ? point.radius * this.zoom : 2;
      const color = point.radius !== null ? '#ad8f2d' : '#1f775e';

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
      this.ctx.strokeStyle = color;
      this.ctx.stroke();
    });
  }

  protected vertexShader(): void {
    const viewportCenter = Complex.create(this.ctx.canvas.clientWidth / 2, this.ctx.canvas.clientHeight / 2);
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

    this.world.points.forEach((point: Point) => {
      point.positionToRender = viewportCenter.clone().add(
        point.position
          .clone()
          .subtract(cameraPosition)
          .multiply(rotation)
          .multiplyScalar(this.zoom)
          .conjugate()
      );
    });
  }
}
