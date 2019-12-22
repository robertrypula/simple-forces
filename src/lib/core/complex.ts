// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

export class Complex {
  public static create(x: number = 0, y: number = 0): Complex {
    return new Complex(x, y);
  }

  public static createPolar(unitAngle: number = 0, magnitude: number = 1): Complex {
    const radian: number = 2 * Math.PI * unitAngle;

    return this.create(magnitude * Math.cos(radian), magnitude * Math.sin(radian));
  }

  public constructor(public x: number = 0, public y: number = 0) {}

  public add(x: Complex): Complex {
    this.x += x.x;
    this.y += x.y;

    return this;
  }

  public clone(): Complex {
    return new Complex(this.x, this.y);
  }

  public conjugate(): Complex {
    this.y *= -1;

    return this;
  }

  public divideScalar(v: number): Complex {
    this.x /= v;
    this.y /= v;

    return this;
  }

  public getMagnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public getUnitAngle(): number {
    const MAGNITUDE_LIMIT = 0.0000001;
    const x = this.x;
    const y = this.y;
    const quarter = y >= 0 ? (x >= 0 ? 1 : 2) : x <= 0 ? 3 : 4;
    let magnitude = this.getMagnitude();
    let angle;
    let unitAngle;

    // prevents from dividing by zero
    magnitude = magnitude < MAGNITUDE_LIMIT ? MAGNITUDE_LIMIT : magnitude;

    //         ^             Legend:
    //  II     *     I        '!' = 0 degrees
    //         |              '*' = 90 degrees
    //  ----@--+--!---->      '@' = 180 degrees
    //         |              '%' = 270 degrees
    //  III    %     IV

    switch (quarter) {
      case 1:
        angle = Math.asin(y / magnitude);
        break;
      case 2:
        angle = Math.asin(-x / magnitude) + 0.5 * Math.PI;
        break;
      case 3:
        angle = Math.asin(-y / magnitude) + Math.PI;
        break;
      case 4:
        angle = Math.asin(x / magnitude) + 1.5 * Math.PI;
        break;
    }

    unitAngle = angle / (2 * Math.PI);

    return unitAngle;
  }

  public multiply(x: Complex): Complex {
    const tempX = this.x * x.x - this.y * x.y;
    const tempY = this.x * x.y + this.y * x.x;

    this.x = tempX;
    this.y = tempY;

    return this;
  }

  public multiplyScalar(v: number): Complex {
    this.x *= v;
    this.y *= v;

    return this;
  }

  public normalize(): Complex {
    this.divideScalar(this.getMagnitude());

    return this;
  }

  public reset(): Complex {
    this.x = 0;
    this.y = 0;

    return this;
  }

  public subtract(x: Complex): Complex {
    this.x -= x.x;
    this.y -= x.y;

    return this;
  }

  public toStringMagnitude(toFixed: number = 3, factor: number = 1): string {
    return (this.getMagnitude() / factor).toFixed(toFixed);
  }

  public toStringXY(toFixed: number = 3, factor: number = 1): string {
    return (this.x / factor).toFixed(toFixed) + ' ' + (this.y / factor).toFixed(toFixed);
  }
}
