import { Sprite, LoaderResource, IPoint, Container } from 'pixi.js';
import { TargetMarker } from './target_marker';
import { Player } from './player';
import { Input } from './input';

export class Game {
  private planet: Sprite;
  private targetMarker: TargetMarker;
  private player: Player;

  private targetAngle = 0.5 * Math.PI;

  public container: Container;

  constructor(
    private center: IPoint,
    resources: Partial<Record<string, LoaderResource>>
  ) {
    this.planet = new Sprite(resources.planet.texture);
    this.planet.anchor.x = 0.5;
    this.planet.anchor.y = 0.5;
    this.planet.position = center;

    this.targetMarker = new TargetMarker(center, resources.crosshair.texture);
    this.targetMarker.update(this.targetAngle);
    this.player = new Player(center);

    this.container = new Container();
    this.container.addChild(this.planet);
    this.container.addChild(this.player.sprite);
    this.container.addChild(this.targetMarker.sprite);
  }

  update() {
    this.targetAngle = updateTargetAngleFromJoystick(this.targetAngle);
    this.targetAngle = updateTargetAngleFromKeyboard(this.targetAngle);

    this.player.update(this.targetAngle);
    this.targetMarker.update(this.targetAngle);
  }
}

function updateTargetAngleFromKeyboard(angle: number) {
  if (!Input.hasKeyboardMovementInput()) return angle;

  const speed = 0.01;
  let x = Math.cos(angle);
  let y = Math.sin(angle);

  if (Input.moveUp()) y += speed;
  if (Input.moveDown()) y -= speed;
  if (Input.moveLeft()) x -= speed;
  if (Input.moveRight()) x += speed;

  return Math.atan2(y, x);
}

function updateTargetAngleFromJoystick(angle: number) {
  if (!Input.gamepad_connected || !Input.hasGamepadMovementAboveThreshold())
    return angle;

  const [horizontal, vertical] = Input.getGamepadJoystick();
  return Math.atan2(-vertical, horizontal);
}
