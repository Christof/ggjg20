import { Sprite, LoaderResource, IPoint, Container } from 'pixi.js';
import { TargetMarker } from './target_marker';
import { Player } from './player';
import { Input } from './input';
import { Cell } from './cell';
import { range } from 'lodash';
import { Water } from './water';
import { Bar } from './bar';
import { Stars } from './stars';

const cellCount = 16;

export class Game {
  private stars: Stars;
  private planet: Sprite;
  private targetMarker: TargetMarker;
  private player: Player;
  private water: Water;
  private bar: Bar;
  private lastFrameTime = Date.now();
  private frameDuration: number;

  private cells: Cell[];

  private targetAngle = 0.5 * Math.PI;

  public container: Container;

  constructor(
    private center: IPoint,
    private resources: Partial<Record<string, LoaderResource>>
  ) {
    this.planet = new Sprite(resources.planet.texture);
    this.planet.anchor.x = 0.5;
    this.planet.anchor.y = 0.5;
    this.planet.position = center;

    this.stars = new Stars(this.planet.transform);

    this.targetMarker = new TargetMarker(center, resources.crosshair.texture);
    this.targetMarker.update(this.targetAngle);
    this.player = new Player(center);
    this.bar = new Bar(
      resources.layer0.texture,
      resources.layer1.texture,
      resources.layer2.texture
    );

    this.container = new Container();
    this.container.addChild(this.bar.container);
    this.container.addChild(this.stars.sprite);
    this.container.addChild(this.planet);
    this.container.addChild(this.player.sprite);
    this.container.addChild(this.targetMarker.sprite);

    this.cells = range(cellCount).map(() => new Cell(center, resources));
    for (const cell of this.cells) {
      this.container.addChild(cell.container);
    }
  }

  private cellForAngle(angle: number) {
    const usedAngle = angle < 0 ? angle + 2 * Math.PI : angle;
    const index = Math.floor((usedAngle / (2 * Math.PI)) * cellCount);

    return this.cells[index];
  }

  update() {
    this.frameDuration = Date.now() - this.lastFrameTime;
    this.lastFrameTime = Date.now();

    this.targetAngle = updateTargetAngleFromJoystick(this.targetAngle);
    this.targetAngle = updateTargetAngleFromKeyboard(this.targetAngle);

    const isExtinguishing = Input.isDown('q') || Input.isGamepadBButtonDown();
    // Prevent movement while extinguishing
    if (isExtinguishing) this.targetAngle = this.player.angle;

    this.player.update(this.targetAngle);
    this.targetMarker.update(this.targetAngle);

    if (Input.isDown('e') || Input.isGamepadAButtonDown()) {
      this.cellForAngle(this.player.angle).plant(this.player.angle);
    }

    if (isExtinguishing && this.water === undefined) {
      this.extinguish();
    }
    if (isExtinguishing) {
      this.cellForAngle(this.player.angle).extinguish(
        this.getExtinguishAngle(),
        this.frameDuration
      );
    }
    if (!isExtinguishing && this.water !== undefined) {
      this.stopQuench();
    }

    this.cells.forEach(cell => cell.update());
  }

  extinguish() {
    this.water = new Water(
      this.center,
      this.getExtinguishAngle(),
      this.player.getOrientation()
    );
    this.container.addChild(this.water.sprite);
  }

  getExtinguishAngle() {
    return this.player.angle - 0.1 * this.player.getOrientation();
  }

  stopQuench() {
    if (this.water) {
      this.water.cleanup();
      const index = this.container.children.indexOf(this.water.sprite);
      this.container.removeChildAt(index);
      this.water = undefined;
    }
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
