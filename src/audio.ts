import { Howl, Howler } from 'howler';
import firestartPath from '../assets/sound/FireStart.mp3';
import fireloopPath from '../assets/sound/FireLoop.mp3';
import firestopPath from '../assets/sound/FireStop.mp3';
import step1Path from '../assets/sound/Footstep1.mp3';
import step2Path from '../assets/sound/Footstep2.mp3';
import quitPath from '../assets/sound/EndOrSomething.mp3';
import waterStartPath from '../assets/sound/WaterStarting.mp3';
import waterLoopPath from '../assets/sound/WaterBodyLoop.mp3';
import waterStopPath from '../assets/sound/WaterStop.mp3';

let firestart = new Howl({ src: firestartPath });
let fireloop = new Howl({ src: fireloopPath, loop: true });
let firestop = new Howl({ src: firestopPath, loop: true });

let waterstart = new Howl({ src: waterStartPath });
let waterloop = new Howl({ src: waterLoopPath, loop: true });
let waterstop = new Howl({ src: waterStopPath });

let step1 = new Howl({ src: step1Path });
let step2 = new Howl({ src: step2Path });
let quit = new Howl({ src: quitPath });

step1.on('end', startStepLoop);
step2.on('end', startStepLoop);

export class Fire {
  firestart_id: number = undefined;
  fireloop_id: number = undefined;
  stopped = false;

  start() {
    this.firestart_id = firestart.play();
    firestart.on(
      'end',
      () => {
        if (!this.stopped) this.fireloop_id = fireloop.play();
      },
      this.firestart_id
    );
  }

  stop() {
    this.stopped = true;
    fireloop.stop(this.fireloop_id);
  }
}

export class FireExtinguishSound {
  id: number = undefined;

  start() {
    this.id = firestop.play();
  }

  stop() {
    firestop.stop(this.id);
  }
}

export class WaterSound {
  waterstart_id: number = undefined;
  waterloop_id: number = undefined;
  stopped = false;

  start() {
    this.waterstart_id = waterstart.play();
    waterstart.on(
      'end',
      () => {
        if (!this.stopped) this.waterloop_id = waterloop.play();
      },
      this.waterstart_id
    );
  }

  stop() {
    this.stopped = true;
    if (this.waterstart_id) {
      waterstart.stop(this.waterstart_id);
    }
    if (this.waterloop_id === undefined) return;
    waterloop.stop(this.waterloop_id);
    waterstop.play();
  }
}

export function startStepLoop() {
  if (Math.random() < 0.5) {
    step1.play();
  } else {
    step2.play();
  }
}

export function stopStepLoop() {
  step1.stop();
  step2.stop();
}
