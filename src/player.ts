import { AnimatedSprite, IPoint, BaseTexture, Spritesheet } from 'pixi.js';
import { Input } from './input';
import alexJSON from '../assets/alex.json';
import { posFromCylinderCoord, rotationToCenter } from './math';
import { startStepLoop, stopStepLoop } from './audio';

export class Player {
  private playerScale = 1;
  private radius = 85;
  private running = false;

  public angle = 0.5 * Math.PI;
  public sprite: AnimatedSprite;

  constructor(private center: IPoint) {
    const baseTexture = new BaseTexture(alexJSON.meta.image, null);
    const spritesheet = new Spritesheet(baseTexture, alexJSON);
    spritesheet.parse(function() {
      // finished preparing spritesheet textures
    });
    this.sprite = new AnimatedSprite(spritesheet.animations['Alex']);
    this.sprite.scale.set(this.playerScale);

    this.sprite.x = center.x;
    this.sprite.y = center.y - this.radius;

    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    this.sprite.animationSpeed = 0.1;
  }

  update(targetAngle: number) {
    const playerSpeed = 0.01; // + delta;
    const diff = (this.angle - targetAngle) % (2 * Math.PI);
    const needsMovement = Math.abs(diff) >= 0.01;
    if (needsMovement) {
      if ((diff < 0 && diff >= -Math.PI) || diff > Math.PI) {
        this.angle += playerSpeed;
      } else {
        this.angle -= playerSpeed;
      }
      this.angle = normalizeAngle(this.angle);
    }
    this.sprite.position = posFromCylinderCoord(
      this.center,
      this.radius,
      this.angle
    );
    this.sprite.scale.x = (Math.sign(diff) || 1) * this.playerScale;

    this.sprite.rotation = rotationToCenter(this.angle);

    if (Input.hasAnyMovementInput() || needsMovement) {
      if (!this.running) {
        startStepLoop();
        this.running = true;
      }
      this.sprite.play();
    } else {
      this.running = false;
      stopStepLoop();
      this.sprite.gotoAndStop(1);
    }
  }
}

function normalizeAngle(angle: number) {
  const mod = angle % (2 * Math.PI);
  if (mod < -Math.PI) return mod + 2 * Math.PI;

  return mod;
}
