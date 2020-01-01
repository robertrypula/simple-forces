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

  public animationFrame(dt: number): void {
    let timeStart: number;
    let time: number;

    timeStart = getTime();
    this.world.animationFrame(dt);
    time = getTime() - timeStart;

    this.log = [
      ['Simulation time', formatTime(this.world.physics.time)],
      ['Simulation delta', formatNumber(this.world.physics.timeWarp * dt, 3) + 's'],
      ['Animation frame delta', formatNumber(dt, 3) + 's'],
      ['Animation frame physics/viewport', formatNumber(time, 3) + 's']
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
