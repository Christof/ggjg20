import { BaseTexture, Spritesheet, AnimatedSprite, Transform } from 'pixi.js';
import alexJSON from '../assets/alex.json';

export class BurningTree {
  public sprite: AnimatedSprite;

  constructor(transform: Transform) {
    const baseTexture = new BaseTexture(alexJSON.meta.image, null);
    const spritesheet = new Spritesheet(baseTexture, alexJSON);
    spritesheet.parse(function() {
      // finished preparing spritesheet textures
    });
    this.sprite = new AnimatedSprite(spritesheet.animations['Alex']);
    this.sprite.transform = transform;
    this.sprite.play();
  }
}
