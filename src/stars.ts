import { BaseTexture, Spritesheet, AnimatedSprite, Transform } from 'pixi.js';
import starsJSON from '../assets/Stars2.json';
import starsPath from '../assets/Stars2.png';

export class Stars {
  private static spritesheet: Spritesheet;
  public sprite: AnimatedSprite;

  constructor(transform: Transform) {
    if (!Stars.spritesheet) {
      console.log('path', starsJSON.meta.image);
      const baseTexture = new BaseTexture(starsPath, null);
      Stars.spritesheet = new Spritesheet(baseTexture, starsJSON);
      Stars.spritesheet.parse(function() {
        // finished preparing spritesheet textures
      });
    }
    this.sprite = new AnimatedSprite(Stars.spritesheet.animations['star']);
    this.sprite.anchor.set(0.5);
    this.sprite.transform = transform;
    this.sprite.animationSpeed = 0.1;
    this.sprite.play();
  }
}
