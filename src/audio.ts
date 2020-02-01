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

export const audio = {
    startFire() {
        let [firestart_id, loop_id] = helper();
        fireloop.pause(loop_id);
        firestart.on("end", () => {
            fireloop.play();
        }, firestart_id);
        return loop_id;
    },
    stopFire(id: number) {
        fireloop.on("end", () => {
            firestop.play();
            fireloop.pause(id);
        }, id)
    }
}