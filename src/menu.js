import * as PIXI from 'pixi.js';
import input from './input.js';
import titlepath from '../assets/titlefont.png';
import startbuttonpath from '../assets/startbutton_standard.png';
import startselectedpath from '../assets/startbutton_selected.png';
import helpbuttonpath from '../assets/helpbutton_standard.png';
import helpselectedpath from '../assets/helpbutton_selected.png';
import titlebuttonpath from '../assets/titlebutton_standard.png';
import titleselectedpath from '../assets/titlebutton_selected.png';
import restartbuttonpath from '../assets/restartbutton_standard.png';
import restartselectedpath from '../assets/restartbutton_selected.png';
import gameoverpath from '../assets/gameover.png';
import howtoplaypath from '../assets/howtoplay.png';
import arrowpath from '../assets/arrowleft.png';
import planetpath from '../assets/planet.png';

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


window.addEventListener('resize', function(event) {
  app.renderer.resize(window.innerWidth, window.innerHeight);
});

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);
/*
let textstyle = new TextStyle({
  fontFamily: "Helvetica",
  fontSize: 72,
  fill: "green",
  stroke: '#ff3300',
  strokeThickness: 4,
  //dropShadow: true,
  //dropShadowColor: "#000000",
  //dropShadowBlur: 4,
  //dropShadowAngle: Math.PI / 6,
  //dropShadowDistance: 6,
});

let message = new Text("Little Planet", textstyle);
message.position.set(app.render.width / 2, app.renderer.height / 2);

app.stage.addChild(message);
*/
// load the texture we need
app.loader
  .add('title', titlepath)
  .add('startbutton', startbuttonpath)
  .add('startselected', startselectedpath)
  .add('helpbutton', helpbuttonpath)
  .add('helpselected', helpselectedpath)
  .add('titlebutton', titlebuttonpath)
  .add('titleselected', titleselectedpath)
  .add('restartbutton', restartbuttonpath)
  .add('restartselected', restartselectedpath)
  .add('gameover', gameoverpath)
  .add('howtoplay', howtoplaypath)
  .add('leftarrow', arrowpath)
  .add('planet', planetpath)
  .load((loader, resources) => {
  // This creates a texture from a 'bunny.png' image
  const title = new PIXI.Sprite(resources.title.texture);

  const startbutton = new PIXI.Sprite(resources.startbutton.texture);
  const startselected = new PIXI.Sprite(resources.startselected.texture);

  const helpbutton = new PIXI.Sprite(resources.helpbutton.texture);
  const helpselected = new PIXI.Sprite(resources.helpselected.texture);

  const titlebutton = new PIXI.Sprite(resources.titlebutton.texture);
  const titleselected = new PIXI.Sprite(resources.titleselected.texture);
  
  const restartbutton = new PIXI.Sprite(resources.restartbutton.texture);
  const restartselected = new PIXI.Sprite(resources.restartselected.texture);

  const gameover = new PIXI.Sprite(resources.gameover.texture);

  const howtoplay = new PIXI.Sprite(resources.howtoplay.texture);

  const leftarrow = new PIXI.Sprite(resources.leftarrow.texture);
  const rightarrow = new PIXI.Sprite(resources.leftarrow.texture);

  const planet = new PIXI.Sprite(resources.planet.texture);

  // Setup the position of the bunny
  title.x = app.renderer.width / 2;
  title.y = app.renderer.height / 2;
  gameover.x = app.renderer.width * 0.5;
  gameover.y = app.renderer.height * 0.5;
  gameover.visible = false;

  planet.x = app.renderer.width*0.7;
  planet.y = app.renderer.height*0.25;


  // Rotate around the center
  title.anchor.x = 0.5;
  title.anchor.y = 0.5;
  title.angle = -10;

  planet.anchor = title.anchor;

  gameover.anchor.x = 0.5;
  gameover.anchor.y = 0.5;
  
  startbutton.x = app.renderer.width / 4;
  startbutton.y = app.renderer.height * 0.8;
  startselected.x = startbutton.x;
  startselected.y = startbutton.y;
  startselected.visible = false;

  helpbutton.x = app.renderer.width * 0.666;
  helpbutton.y = app.renderer.height * 0.8;
  helpselected.x = helpbutton.x;
  helpselected.y = helpbutton.y;
  helpselected.visible = false;

  restartbutton.x = app.renderer.width * 0.3;
  restartbutton.y = app.renderer.height * 0.5;
  restartselected.x = restartbutton.x;
  restartselected.y = restartbutton.y;
  restartselected.visible = false;
  restartbutton.visible = false;

  titlebutton.x = app.renderer.width * 0.6;
  titlebutton.y = app.renderer.height * 0.5;
  titleselected.x = titlebutton.x;
  titleselected.y = titlebutton.y;
  titleselected.visible = false;
  titlebutton.visible = false;

  howtoplay.x = app.renderer.width * 0.1;
  howtoplay.y = app.renderer.height * 0.1;
  howtoplay.visible = false;

  leftarrow.x = app.renderer.width * 0.2;
  leftarrow.y = app.renderer.height * 0.9;
  leftarrow.visible = false;

  rightarrow.x = app.renderer.width * 0.8;
  rightarrow.y = leftarrow.y+10;
  rightarrow.anchor.x = 0.5;
  rightarrow.anchor.y = 0.5;
  rightarrow.visible = false;
  rightarrow.angle = 180;


  // Add the bunny to the scene we are building
  app.stage.addChild(title);
  app.stage.addChild(startbutton);
  app.stage.addChild(startselected);
  app.stage.addChild(helpbutton);
  app.stage.addChild(helpselected);
  app.stage.addChild(titlebutton);
  app.stage.addChild(titleselected);
  app.stage.addChild(restartbutton);
  app.stage.addChild(restartselected);
  app.stage.addChild(gameover);
  app.stage.addChild(howtoplay);
  app.stage.addChild(leftarrow);
  app.stage.addChild(rightarrow);
  app.stage.addChild(planet);

  var tilttimer = 0;
  var tiltdirection = true;
  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    if(title.visible){
      if(tilttimer < 60){
        if(tiltdirection){
          title.rotation += 0.005;          
        }
        else{
          title.rotation -= 0.005;
        }
        planet.rotation = -title.rotation * 2.5;
        tilttimer++;
      }
      else{
        if(tiltdirection){
          tiltdirection = false;
        }
        else{
          tiltdirection = true;
        }
        tilttimer = 0;
      }
    

    //const [horizontal, vertical] = input.getGamepadJoystick();
    
      if(input.isDown('a') || input.isDown('ArrowLeft')){ //if(horizontal<0)??
        startbutton.visible = false;
        startselected.visible = true;

        helpbutton.visible = true;
        helpselected.visible = false;
      }

      if(input.isDown('d') || input.isDown('ArrowRight')){ //if(horizontal>0)??
        startbutton.visible = true;
        startselected.visible = false;

        helpbutton.visible = false;
        helpselected.visible = true;
      }

      if(input.isDown('Enter') && startselected.visible == true){
        disableTitleScreen(title, startbutton, startselected, helpbutton, helpselected, planet);
        enableGameOverScreen(gameover, restartbutton, restartselected, titlebutton, titleselected)
      }

      else if(input.isDown('Enter') && helpselected.visible == true){
        disableTitleScreen(title, startbutton, startselected, helpbutton, helpselected, planet);
        howtoplay.visible = true;
        leftarrow.visible = true;
        rightarrow.visible = true;
      }
    }
    else if(gameover.visible == true){
      
      if(gameover.angle<180){
        gameover.rotation += 0.01;
        gameover.y += 2.5;
      }
      else{
        gameover.y += 0.8;
      }

      if(gameover.y >= app.renderer.height){
        titlebutton.visible = true;
        restartbutton.visible = true;

        if(input.isDown('a') || input.isDown('ArrowLeft')){ 
          restartbutton.visible = false;
          restartselected.visible = true;
  
          titlebutton.visible = true;
          titleselected.visible = false;
        }
  
        if(input.isDown('d') || input.isDown('ArrowRight')){ 
          restartbutton.visible = true;
          restartselected.visible = false;
  
          titlebutton.visible = false;
          titleselected.visible = true;
        }

        if(input.isDown('Enter') && titleselected.visible == true){
          disableGameOverScreen(gameover, restartbutton, restartselected, titlebutton, titleselected)
          enableTitleScreen(title, startbutton, startselected, helpbutton, helpselected, planet);
        }
        
        if(input.isDown('Enter') && restartselected.visible == true){
          disableTitleScreen(title, startbutton, startselected, helpbutton, helpselected, planet);
          enableGameOverScreen(gameover, restartbutton, restartselected, titlebutton, titleselected)
        }
      }

    }

    else if(howtoplay.visible == true){
      if(input.isDown('a') || input.isDown('ArrowLeft')){
        howtoplay.visible = false;
        leftarrow.visible = false;
        rightarrow.visible = false;

        enableTitleScreen(title, startbutton, startselected, helpbutton, helpselected, planet);
      }
    }
  });
});

function enableTitleScreen(title, startbutton, startselected, helpbutton, helpselected, planet){
  title.visible = true;
  startbutton.visible = true;
  startselected.visible = false;

  helpbutton.visible = true;
  helpselected.visible = false;

  planet.visible = true;
}

function disableTitleScreen(title, startbutton, startselected, helpbutton, helpselected, planet){
  title.visible = false;
  startbutton.visible = false;
  startselected.visible = false;

  helpbutton.visible = false;
  helpselected.visible = false;

  planet.visible = false;
}

function enableGameOverScreen(gameover, restartbutton, restartselected, titlebutton, titleselected){
  gameover.visible = true;
  gameover.angle = 0;
  gameover.y = app.renderer.height * 0.5;

  restartbutton.visible = false;
  restartselected.visible = false;

  titlebutton.visible = false;
  titleselected.visible = false;
}

function disableGameOverScreen(gameover, restartbutton, restartselected, titlebutton, titleselected){
  gameover.visible = false;
  gameover.angle = 0;
  gameover.y = app.renderer.height * 0.5;
 
  restartbutton.visible = false;
  restartselected.visible = false;

  titlebutton.visible = false;
  titleselected.visible = false;
}