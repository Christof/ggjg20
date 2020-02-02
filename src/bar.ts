import { Sprite, Texture, Container, Graphics, graphicsUtils } from 'pixi.js';

export class Bar {
    percentage = 1;
    container: Container
    private mask: Graphics;
    private layer0: Sprite;
    private layer1: Sprite;
    private layer2: Sprite;

    constructor(layer0: Texture, layer1: Texture, layer2: Texture) {
        this.container = new Container();
        this.mask = new Graphics();
        this.mask.beginFill(0xF);
        this.mask.drawRect(0, 0, 64, 128);
        this.mask.endFill();
        this.layer0 = new Sprite(layer0);
        this.layer1 = new Sprite(layer1);
        this.layer1.mask = this.mask;
        this.layer2 = new Sprite(layer2);
        this.container.addChild(this.layer0, this.layer1, this.layer2);
    }

    public set(percentage: number) {
        this.percentage = percentage;
        this.mask.clear();
        this.mask.beginFill(0xF);
        this.mask.drawRect(0, 0, 64, 128*percentage);
    }
}