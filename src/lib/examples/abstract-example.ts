// Copyright (c) 2018-2020 Robert Rypuła - https://github.com/robertrypula

// in your code replace `from '@';` with `from 'simple-forces';`
import { formatNumber, formatTime, getTime, World } from '@';

export abstract class AbstractExample {
  public log: Array<[string, string]> = [];
  public world: World;

  protected loadHistory: number[] = [];

  public constructor() {
    this.world = new World();
    this.createScene();
    this.world.refreshAwareness();
  }

  public animationFrame(dt: number): void {
    let timeStart: number;
    let time: number;
    let loadAverage: number;

    timeStart = getTime();
    this.world.animationFrame(dt);
    time = getTime() - timeStart;

    this.loadHistory.length === 30 && this.loadHistory.pop();
    this.loadHistory.push(time / dt);
    loadAverage = this.loadHistory.reduce((p: number, c: number): number => p + c, 0) / this.loadHistory.length;

    this.log = [
      ['Simulation time', formatTime(this.world.physics.time)],
      ['Simulation time warp', formatNumber(this.world.physics.timeWarp, 3) + 's per second'],
      [
        'Simulation smallest step delta',
        formatNumber((this.world.physics.timeWarp * dt) / this.world.physics.internalSteps, 6) + 's'
      ],
      ['Animation frame delta', formatNumber(dt, 3) + 's'],
      ['Animation frame physics/viewport', formatNumber(time, 3) + 's (load ' + formatNumber(loadAverage, 2) + ')']
    ];
  }

  public abstract createScene(): void;

  public keyboardEvent(key: string, isPressed: boolean): void {
    switch (key) {
      case 'KeyZ':
        // console.log(`zoom+ ${isPressed ? 'pressed' : 'released'}`);
        break;
      case 'KeyX':
        // console.log(`zoom- ${isPressed ? 'pressed' : 'released'}`);
        break;
    }
  }
}
