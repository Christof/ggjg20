import { BaseTexture, Spritesheet, AnimatedSprite, IPoint } from 'pixi.js';
import waterJSON from '../assets/water3.json';
import waterPath from '../assets/water3.png';
import { WaterSound } from './audio';
import { posFromCylinderCoord, rotationToCenter } from './math';

export class Water {
  private static spritesheet: Spritesheet;
  private waterSound = new WaterSound();
  public sprite: AnimatedSprite;

  constructor(center: IPoint, angle: number) {
    if (!Water.spritesheet) {
      const baseTexture = new BaseTexture(waterPath, null);
      Water.spritesheet = new Spritesheet(baseTexture, waterJSON);
      Water.spritesheet.parse(function() {
        // finished preparing spritesheet textures
      });
    }
    this.sprite = new AnimatedSprite(Water.spritesheet.animations['Water']);
    this.sprite.position = posFromCylinderCoord(center, 84, angle);
    this.sprite.rotation = rotationToCenter(angle);
    this.sprite.anchor.set(0.5);
    this.sprite.animationSpeed = 0.1;
    this.sprite.play();
    this.waterSound.start();
  }

  cleanup() {
    this.waterSound.stop();
  }
}
