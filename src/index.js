import * as PIXI from 'pixi.js';
import input from './input.js';
import _bunny from '../assets/bunnys.png';
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

window.addEventListener('resize', function(event) {
  app.renderer.resize(window.innerWidth, window.innerHeight);
});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
app.loader
  .add('player', 'assets/player.png')
  .add('bunny', 'assets/bunnys.png')
  .load((loader, resources) => {
    // This creates a texture from a 'bunny.png' image
    const bunny = new PIXI.Sprite(resources.bunny.texture);
    const player = new PIXI.Sprite(resources.player.texture);

    player.x = 0.5 * app.renderer.width;
    player.y = 0.3 * app.renderer.height;

    // player.anchor.x = 0.5;
    // player.anchor.y = 0.5;

    // Setup the position of the bunny
    bunny.x = app.renderer.width / 2;
    bunny.y = app.renderer.height / 2;

    // Rotate around the center
    bunny.anchor.x = 0.5;
    bunny.anchor.y = 0.5;

    // Add the bunny to the scene we are building
    app.stage.addChild(bunny);
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
        bunny.x += 0.5;
      } else {
        bunny.x -= 0.5;
      }
      bunny.rotation += 0.01;
    });
  });
