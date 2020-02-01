import { Sprite, IPoint, Texture } from 'pixi.js';
import { posFromCylinderCoord, rotationToCenter } from './math';

export class TargetMarker {
  private radius = 98;

  public sprite: Sprite;

  constructor(private center: IPoint, texture: Texture) {
    this.sprite = new Sprite(texture);
  }

  update(targetAngle: number) {
    this.sprite.position = posFromCylinderCoord(
      this.center,
      this.radius,
      targetAngle
    );
    this.sprite.rotation = rotationToCenter(targetAngle);
  }
}
