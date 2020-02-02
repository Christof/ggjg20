import { Sprite, Texture } from 'pixi.js';

export class Bar {
    percentage = 0;
    layer0: Sprite;
    layer1: Sprite;
    layer2: Sprite;

    constructor(layer0: Texture, layer1: Texture, layer2: Texture) {
        this.layer0 = new Sprite(layer0);
        this.layer1 = new Sprite(layer0);
        this.layer2 = new Sprite(layer0);
    }
}