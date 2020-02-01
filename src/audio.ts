import { Howl, Howler } from 'howler';
import firestartPath from '../assets/sound/FireStart.mp3';
import fireloopPath from '../assets/sound/FireLoop.mp3';
import firestopPath from '../assets/sound/FireStop.mp3';
import step1Path from '../assets/sound/Footstep1.mp3';
import step2Path from '../assets/sound/Footstep2.mp3';

let firestart = new Howl({ src: firestartPath });
let fireloop = new Howl({ src: fireloopPath, loop: true });
let firestop = new Howl({ src: firestopPath });
let step1 = new Howl({ src: step1Path });
let step2 = new Howl({ src: step2Path });

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
    if (this.fireloop_id === undefined) return;

    fireloop.on(
      'end',
      () => {
        firestop.play();
        fireloop.pause(this.fireloop_id);
      },
      this.fireloop_id
    );
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
