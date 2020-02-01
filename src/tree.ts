import { IPoint, Sprite, Texture } from 'pixi.js';
import { posFromCylinderCoord, rotationToCenter } from './math';

export class Tree {
  private radius = 85;
  public sprite: Sprite;

  constructor(center: IPoint, angle: number, treeTexture: Texture) {
    this.sprite = new Sprite(treeTexture);

    this.sprite.anchor.set(0.5);
    this.sprite.position = posFromCylinderCoord(center, this.radius, angle);
    this.sprite.rotation = rotationToCenter(angle);
  }
}
