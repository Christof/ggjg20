import { Sprite, IPoint, Texture } from 'pixi.js';

export class TargetMarker {
  private radius = 98;

  public sprite: Sprite;

  constructor(private center: IPoint, texture: Texture) {
    this.sprite = new Sprite(texture);
  }

  update(targetAngle: number) {
    this.sprite.x = this.center.x + this.radius * Math.cos(targetAngle);
    this.sprite.y = this.center.y - this.radius * Math.sin(targetAngle);
  }
}
