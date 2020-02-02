import { BaseTexture, Spritesheet, AnimatedSprite, Transform } from 'pixi.js';
import treeWaterJSON from '../assets/Tree_water.json';
import treeWaterPath from '../assets/Tree_water.png';
import { Fire } from './audio';

export class TreeExtinguish {
  private static spritesheet: Spritesheet;
  private fireSound = new Fire();
  public sprite: AnimatedSprite;

  constructor(transform: Transform) {
    if (!TreeExtinguish.spritesheet) {
      const baseTexture = new BaseTexture(treeWaterPath, null);
      TreeExtinguish.spritesheet = new Spritesheet(baseTexture, treeWaterJSON);
      TreeExtinguish.spritesheet.parse(function() {
        // finished preparing spritesheet textures
      });
    }
    this.sprite = new AnimatedSprite(
      TreeExtinguish.spritesheet.animations['Tree_Water']
    );
    this.sprite.anchor.set(0.5);
    this.sprite.transform = transform;
    this.sprite.animationSpeed = 0.1;
    this.sprite.play();
    this.fireSound.start();
  }

  cleanup() {
    this.fireSound.stop();
  }
}
