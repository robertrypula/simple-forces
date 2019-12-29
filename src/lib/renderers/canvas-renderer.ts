// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

import { Line } from '@core/constraints/line';
import { Point } from '@core/constraints/point';
import { World } from '@core/world';

export class CanvasRenderer {
  public constructor(protected ctx: CanvasRenderingContext2D, protected world: World) {
    this.world.viewport.width = this.ctx.canvas.clientWidth;
    this.world.viewport.height = this.ctx.canvas.clientHeight;
  }

  public render(): void {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.renderLines();
      this.renderPoints();
    }
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
      const radius = point.radius !== null ? point.radius * this.world.viewport.scale : 2;
      const color = point.radius !== null ? '#ad8f2d' : '#1f775e';

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, radius, 0, 2 * Math.PI);
      this.ctx.strokeStyle = color;
      this.ctx.stroke();
    });
  }
}
