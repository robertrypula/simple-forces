// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

import { Complex } from '@core/complex';
import { Line } from '@core/constraints-hosts/line';
import { Point } from '@core/constraints-hosts/point';
import { RadiusType } from '@core/models';
import { World } from '@core/world';

export class CanvasRenderer {
  public constructor(
    protected ctx: CanvasRenderingContext2D,
    protected world: World,
    protected pixelRatio: number = 2
  ) {
    this.world.viewport.width = pixelRatio * this.ctx.canvas.clientWidth;
    this.world.viewport.height = pixelRatio * this.ctx.canvas.clientHeight;
    this.ctx.canvas.setAttribute('width', this.world.viewport.width + '');
    this.ctx.canvas.setAttribute('height', this.world.viewport.height + '');
  }

  public render(): void {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.world.viewport.width, this.world.viewport.height);
      this.renderLines();
      this.renderPoints();
    }
  }

  protected renderLines(): void {
    this.ctx.lineWidth = this.pixelRatio;
    this.world.lines.forEach((line: Line): void => {
      const pA: Complex = line.pointA.rendererData.position;
      const pB: Complex = line.pointB.rendererData.position;

      this.ctx.beginPath();
      this.ctx.moveTo(pA.x, pA.y);
      this.ctx.lineTo(pB.x, pB.y);
      this.ctx.strokeStyle = '#a4aab0';
      this.ctx.stroke();
    });
  }

  protected renderPoints(): void {
    this.world.points.forEach((point: Point): void => {
      const p: Complex = point.rendererData.position;
      const radius: number =
        point.rendererData.radiusType === RadiusType.Screen
          ? this.pixelRatio * point.rendererData.radius
          : point.rendererData.radius;
      const color: string = point.rendererData.radiusType === RadiusType.Screen ? '#1f775e' : '#ad8f2d';

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
      this.ctx.strokeStyle = color;
      this.ctx.stroke();
    });
  }
}
