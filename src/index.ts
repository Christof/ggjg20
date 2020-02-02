import * as PIXI from "pixi.js";
const { settings, Application, SCALE_MODES } = PIXI;
import planetPath from "../assets/planet.png";
import crosshairPath from "../assets/crosshair.png";
import treePath from "../assets/Tree_8x16.png";
import { Fire } from "./audio";
import { Game } from "./game";
//menu stuff
import { Menu } from "./menu";
import titlePath from "../assets/titlefont.png";
import startbuttonPath from "../assets/startbutton_standard.png";
import startselectedPath from "../assets/startbutton_selected.png";
import helpbuttonPath from "../assets/helpbutton_standard.png";
import helpselectedPath from "../assets/helpbutton_selected.png";
import titlebuttonPath from "../assets/titlebutton_standard.png";
import titleselectedPath from "../assets/titlebutton_selected.png";
import restartbuttonPath from "../assets/restartbutton_standard.png";
import restartselectedPath from "../assets/restartbutton_selected.png";
import gameoverPath from "../assets/gameover.png";
import howtoplayPath from "../assets/howtoplay.png";
import arrowPath from "../assets/arrowleft.png";
import smallplanetPath from "../assets/planet_xxs.png";
import backgroundPath from "../assets/start_background.png";

(window as any).fire = Fire;

const newStyle = document.createElement("style");
const style = "* {padding: 0; margin: 0}";
newStyle.appendChild(document.createTextNode(style));
document.head.appendChild(newStyle);

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new Application();
app.stage.scale.set(2, 2);
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.backgroundColor = 0x0;

settings.SCALE_MODE = SCALE_MODES.NEAREST;

window.addEventListener("resize", function(event) {
  app.renderer.resize(window.innerWidth, window.innerHeight);
});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
app.loader
  .add("crosshair", crosshairPath)
  .add("tree", treePath)
  .add("planet", planetPath)
  .add("title", titlePath)
  .add("startButton", startbuttonPath)
  .add("startSelected", startselectedPath)
  .add("helpButton", helpbuttonPath)
  .add("helpSelected", helpselectedPath)
  .add("gameOver", gameoverPath)
  .add("restartButton", restartbuttonPath)
  .add("restartSelected", restartselectedPath)
  .add("titleButton", titlebuttonPath)
  .add("titleSelected", titleselectedPath)
  .add("arrowLeft", arrowPath)
  .add("howToPlay", howtoplayPath)
  .add("menuBackground", backgroundPath)
  .add("smallPlanet", smallplanetPath)
  .load((loader, resources) => {
    const centerX = 0.25 * app.renderer.width;
    const centerY = 0.25 * app.renderer.height;
    const center = new PIXI.Point(centerX, centerY);

    const game = new Game(center, resources);
    const startGame = () => app.stage.addChild(game.container);


    //const game = new Game(center, resources);
    //app.stage.addChild(game.container);

    const menu = new Menu(center, resources, startGame);
    app.stage.addChild(menu.container);

    app.ticker.add(delta => {
      //game.update();
      menu.update();
    });
  });
