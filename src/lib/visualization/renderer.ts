// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

import { Complex, Line, Point, World } from '..';

export class Renderer {
  public zoom: number = 140;
  public camera: Line;

  public constructor(
    protected ctx: CanvasRenderingContext2D,
    protected world: World
  ) {}

  public render(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    if (!this.ctx) {
      throw new Error('Please provide HTML5 canvas context');
    }

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
      this.ctx.strokeStyle = '#d8dde2';
      this.ctx.stroke();
    });
  }

  protected renderPoints(): void {
    this.world.points.forEach((point: Point) => {
      const p =  point.positionToRender;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
      this.ctx.fillStyle = '#2dad8f';
      this.ctx.fill();
    });
  }

  protected vertexShader(): void {
    const viewportCenter = Complex.create(
      this.ctx.canvas.clientWidth / 2,
      this.ctx.canvas.clientHeight / 2
    );
    const unitAngle = this.camera ? this.camera.getUnitAngle() : 0;
    const cameraPosition = this.camera ? this.camera.pointA.position : Complex.create();
    const rotation = Complex.createPolar(-unitAngle);

    this.world.points.forEach((point: Point) => {
      point.positionToRender = viewportCenter
        .clone()
        .add(
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
