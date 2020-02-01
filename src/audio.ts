import {Howl, Howler} from 'howler';
import firestartPath from "../assets/sound/FireStart.mp3";
import fireloopPath from "../assets/sound/FireLoop.mp3";
import firestopPath from "../assets/sound/FireStop.mp3";

let firestart = new Howl({src: firestartPath});
let fireloop = new Howl({src: fireloopPath, loop: true});
let firestop = new Howl({src: firestopPath});

function helper() {
    let id = firestart.play();
    return [id, fireloop.play()];
}

export class Fire {
    firestart_id = 0;
    fireloop_id = 0;

    start() {
        this.firestart_id = firestart.play();
        this.fireloop_id = fireloop.play();
        fireloop.pause(this.fireloop_id);
        firestart.on("end", () => {
            fireloop.play();
        }, this.firestart_id);
    }

    stop() {
        fireloop.on("end", () => {
            firestop.play();
            fireloop.pause(this.fireloop_id);
        })
    }
}
