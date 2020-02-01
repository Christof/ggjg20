import * as PIXI from 'pixi.js';
import input from './input.js';
import planetPath from '../assets/planet.png';
import playerPath from '../assets/player.png';

import alexJSON from '../assets/alex.json';

const newStyle = document.createElement('style');
const style = '* {padding: 0; margin: 0}';
newStyle.appendChild(document.createTextNode(style));
document.head.appendChild(newStyle);

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();
app.stage.scale.set(2, 2);
app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = 'block';
app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.backgroundColor = 0x0;

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

window.addEventListener('resize', function(event) {
  app.renderer.resize(window.innerWidth, window.innerHeight);
});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

let targetAngle = 0.5 * Math.PI;
// load the texture we need
app.loader
  .add('player', playerPath)
  .add('planet', planetPath)
  .load((loader, resources) => {
    const planet = new PIXI.Sprite(resources.planet.texture);
    const targetMarker = new PIXI.Sprite(resources.player.texture);
    const baseTexture = new PIXI.BaseTexture(alexJSON.meta.image, null, 1);
    const spritesheet = new PIXI.Spritesheet(baseTexture, alexJSON);
    spritesheet.parse(function(textures) {
      // finished preparing spritesheet textures
    });
    const player = new PIXI.AnimatedSprite(spritesheet.animations['Alex']);
    const playerScale = 2;
    player.scale.set(playerScale);
    targetMarker.scale.x = 0.5;
    targetMarker.scale.y = 0.5;

    const centerX = 0.25 * app.renderer.width;
    const centerY = 0.25 * app.renderer.height;
    const radius = 88;
    let angle = 0.5 * Math.PI;
    player.x = centerX;
    player.y = centerY - radius;

    player.anchor.x = 0.5;
    player.anchor.y = 0.5;

    planet.anchor.x = 0.5;
    planet.anchor.y = 0.5;
    planet.x = centerX;
    planet.y = centerY;

    const angles = new PIXI.Text('', { fill: 0xffffff, fontSize: 10 });
    angles.x = 10;
    angles.y = 10;

    // Add the bunny to the scene we are building
    app.stage.addChild(planet);
    app.stage.addChild(player);
    app.stage.addChild(targetMarker);
    app.stage.addChild(angles);

    player.animationSpeed = 0.1;

    // Listen for frame updates
    app.ticker.add(delta => {
      targetAngle = updateTargetAngleFromJoystick(targetAngle);
      targetAngle = updateTargetAngleFromKeyboard(targetAngle);
      // console.log(horizontal, vertical, targetAngle, delta);

      const playerSpeed = 0.01; // + delta;
      const diff = (angle - targetAngle) % (2 * Math.PI);
      const needsMovement = Math.abs(diff) >= 0.01;
      if (needsMovement) {
        if ((diff < 0 && diff >= -Math.PI) || diff > Math.PI) {
          angle += playerSpeed;
        } else {
          angle -= playerSpeed;
        }
        angle = normalizeAngle(angle);
      }
      player.x = centerX + radius * Math.cos(angle);
      player.y = centerY - radius * Math.sin(angle);
      player.scale.x = (Math.sign(diff) || 1) * playerScale;

      player.rotation = -angle + 0.5 * Math.PI;

      if (input.hasAnyInput() || needsMovement) {
        player.play();
      } else {
        player.gotoAndStop(1);
      }

      targetMarker.x = centerX + radius * Math.cos(targetAngle);
      targetMarker.y = centerY - radius * Math.sin(targetAngle);

      angles.text = `Target: ${targetAngle} Current: ${angle}\nDiff: ${diff}`;
    });
  });

function updateTargetAngleFromKeyboard(angle) {
  if (
    !input.moveUp() &&
    !input.moveDown() &&
    !input.moveLeft() &&
    !input.moveRight()
  )
    return angle;

  const speed = 0.01;
  let x = Math.cos(angle);
  let y = Math.sin(angle);

  if (input.moveUp()) y += speed;
  if (input.moveDown()) y -= speed;
  if (input.moveLeft()) x -= speed;
  if (input.moveRight()) x += speed;

  return Math.atan2(y, x);
}

function updateTargetAngleFromJoystick(angle) {
  if (!input.gamepad_connected || !input.hasGamepadMovementAboveThreshold())
    return angle;

  const [horizontal, vertical] = input.getGamepadJoystick();
  return Math.atan2(-vertical, horizontal);
}

function normalizeAngle(angle) {
  const mod = angle % (2 * Math.PI);
  if (mod < -Math.PI) return mod + 2 * Math.PI;

  return mod;
}
