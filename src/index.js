import * as PIXI from 'pixi.js';
import input from './input.js';
import _planet from '../assets/planet.png';
import _player from '../assets/player.png';

const newStyle = document.createElement('style');
const style = '* {padding: 0; margin: 0}';
newStyle.appendChild(document.createTextNode(style));
document.head.appendChild(newStyle);

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();
app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = 'block';
app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.backgroundColor = 0xffffff;

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

window.addEventListener('resize', function(event) {
  app.renderer.resize(window.innerWidth, window.innerHeight);
});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
app.loader
  .add('player', 'assets/player.png')
  .add('planet', 'assets/planet.png')
  .load((loader, resources) => {
    const player = new PIXI.Sprite(resources.player.texture);
    const planet = new PIXI.Sprite(resources.planet.texture);

    const centerX = 0.5 * app.renderer.width;
    const centerY = 0.5 * app.renderer.height;
    const radius = 80;
    let angle = 0;
    player.x = centerX;
    player.y = centerY - radius;

    player.anchor.x = 0.5;
    player.anchor.y = 1.0;

    // Setup the position of the bunny
    planet.x = app.renderer.width / 2;
    planet.y = app.renderer.height / 2;

    // Rotate around the center
    planet.anchor.x = 0.5;
    planet.anchor.y = 0.5;

    // Add the bunny to the scene we are building
    app.stage.addChild(planet);
    app.stage.addChild(player);

    // Listen for frame updates
    app.ticker.add(() => {
      // each frame we spin the bunny around a bit
      let horizontal, vertical;
      if (input.gamepad_connected) {
        [horizontal, vertical] = input.getGamepadJoystick();
      }
      console.log(horizontal, vertical);
      if (horizontal < 0) {
        planet.x += 0.5;
      } else {
        planet.x -= 0.5;
      }
      planet.rotation += 0.01;
    });
  });
