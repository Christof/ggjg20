import { BaseTexture, Spritesheet, AnimatedSprite, Transform } from 'pixi.js';
import treeJSON from '../assets/TreeBurn.json';
import { Fire } from './audio';

export class BurningTree {
  private static spritesheet: Spritesheet;
  private fireSound = new Fire();
  public sprite: AnimatedSprite;

  constructor(transform: Transform) {
    if (!BurningTree.spritesheet) {
      const baseTexture = new BaseTexture(treeJSON.meta.image, null);
      BurningTree.spritesheet = new Spritesheet(baseTexture, treeJSON);
      BurningTree.spritesheet.parse(function() {
        // finished preparing spritesheet textures
      });
    }
    this.sprite = new AnimatedSprite(
      BurningTree.spritesheet.animations['TreeBurn']
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
