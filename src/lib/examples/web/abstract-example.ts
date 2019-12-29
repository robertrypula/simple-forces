// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { formatNumber, formatTime, getTime, World } from '@';

export abstract class AbstractExample {
  public log: Array<[string, string]> = [];
  public world: World;

  protected constructor() {
    this.world = new World();
    this.createScene();
    this.world.refreshAwareness();
  }

  public abstract createScene(): void;

  public animationFrame(dt: number): void {
    let timeStart: number;
    let time: number;

    timeStart = getTime();
    this.world.animationFrame(dt);
    time = getTime() - timeStart;

    this.log = [
      ['Simulation total time', formatTime(this.world.physics.time)],
      ['Simulation time per frame', formatTime(this.world.physics.timeWarp * dt)],
      ['Animation frame - full frame delta', formatNumber(dt, 3) + 's'],
      ['Animation frame - physics/viewport times', formatNumber(time, 3) + 's']
    ];
  }
}
