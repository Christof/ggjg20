import { AnimatedSprite, IPoint } from 'pixi.js';
import { Input } from './input';

export class Player {
  private playerScale = 1;
  private radius = 85;

  private angle = 0.5 * Math.PI;

  constructor(public player: AnimatedSprite, private center: IPoint) {
    player.scale.set(this.playerScale);

    player.x = center.x;
    player.y = center.y - this.radius;

    player.anchor.x = 0.5;
    player.anchor.y = 0.5;

    player.animationSpeed = 0.1;
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
    this.player.x = this.center.x + this.radius * Math.cos(this.angle);
    this.player.y = this.center.y - this.radius * Math.sin(this.angle);
    this.player.scale.x = (Math.sign(diff) || 1) * this.playerScale;

    this.player.rotation = -this.angle + 0.5 * Math.PI;

    if (Input.hasAnyMovementInput() || needsMovement) {
      this.player.play();
    } else {
      this.player.gotoAndStop(1);
    }
  }
}

function normalizeAngle(angle: number) {
  const mod = angle % (2 * Math.PI);
  if (mod < -Math.PI) return mod + 2 * Math.PI;

  return mod;
}
