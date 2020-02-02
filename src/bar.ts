import { Sprite, Texture, Container } from 'pixi.js';

export class Bar {
    percentage = 0;
    container: Container
    layer0: Sprite;
    layer1: Sprite;
    layer2: Sprite;

    constructor(layer0: Texture, layer1: Texture, layer2: Texture) {
        this.container = new Container();
        this.layer0 = new Sprite(layer0);
        this.layer1 = new Sprite(layer1);
        this.layer2 = new Sprite(layer2);
        this.container.addChild(this.layer0, this.layer1, this.layer2);
    }
}