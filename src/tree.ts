import { IPoint, Sprite, Texture } from 'pixi.js';

export class Tree {
  private radius = 85;
  public sprite: Sprite;

  constructor(center: IPoint, angle: number, treeTexture: Texture) {
    this.sprite = new Sprite(treeTexture);

    this.sprite.x = center.x + this.radius * Math.cos(angle);
    this.sprite.y = center.y - this.radius * Math.sin(angle);
  }
}
