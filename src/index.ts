import { Input } from './input';
import * as PIXI from 'pixi.js';
const { settings, Application, SCALE_MODES, Sprite } = PIXI;
import planetPath from '../assets/planet.png';
import crosshairPath from '../assets/crosshair.png';

import { Player } from './player';

const newStyle = document.createElement('style');
const style = '* {padding: 0; margin: 0}';
newStyle.appendChild(document.createTextNode(style));
document.head.appendChild(newStyle);

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new Application();
app.stage.scale.set(2, 2);
app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = 'block';
app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.backgroundColor = 0x0;

settings.SCALE_MODE = SCALE_MODES.NEAREST;

window.addEventListener('resize', function(event) {
  app.renderer.resize(window.innerWidth, window.innerHeight);
});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

let targetAngle = 0.5 * Math.PI;
// load the texture we need
app.loader
  .add('crosshair', crosshairPath)
  .add('planet', planetPath)
  .load((loader, resources) => {
    const planet = new Sprite(resources.planet.texture);
    const targetMarker = new Sprite(resources.crosshair.texture);
    const centerX = 0.25 * app.renderer.width;
    const centerY = 0.25 * app.renderer.height;
    const center = new PIXI.Point(centerX, centerY);
    const player = new Player(center);

    const radius = 88;

    planet.anchor.x = 0.5;
    planet.anchor.y = 0.5;
    planet.x = centerX;
    planet.y = centerY;

    app.stage.addChild(planet);
    app.stage.addChild(player.sprite);
    app.stage.addChild(targetMarker);

    app.ticker.add(delta => {
      targetAngle = updateTargetAngleFromJoystick(targetAngle);
      targetAngle = updateTargetAngleFromKeyboard(targetAngle);

      player.update(targetAngle);

      targetMarker.x = centerX + radius * Math.cos(targetAngle);
      targetMarker.y = centerY - radius * Math.sin(targetAngle);
    });
  });

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
