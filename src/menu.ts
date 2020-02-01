import { Sprite, LoaderResource, IPoint, Container } from 'pixi.js';
import { Input } from './input';
/*import { titlepath } from '../assets/titlefont.png';
import { startbuttonpath } from '../assets/startbutton_standard.png';
import { startselectedpath } from '../assets/startbutton_selected.png';
import { helpbuttonpath } from '../assets/helpbutton_standard.png';
import { helpselectedpath } from '../assets/helpbutton_selected.png';
import { titlebuttonpath } from '../assets/titlebutton_standard.png';
import { titleselectedpath } from '../assets/titlebutton_selected.png';
import { restartbuttonpath } from '../assets/restartbutton_standard.png';
import { restartselectedpath } from '../assets/restartbutton_selected.png';
import { gameoverpath } from '../assets/gameover.png';
import { howtoplaypath } from '../assets/howtoplay.png';
import { arrowpath } from '../assets/arrowleft.png';
import { planetpath } from '../assets/planet.png';
*/
export class Menu{

// load the texture we need
  private title: Sprite;
  private startButton: Sprite;
  private startSelected: Sprite;
  private helpButton: Sprite;
  private helpSelected: Sprite;
  private titleButton: Sprite;
  private titleSelected: Sprite;
  private restartButton: Sprite;
  private restartSelected: Sprite;
  private gameOver: Sprite;
  private howToPlay: Sprite;
  private arrowLeft: Sprite;
  private arrowRight: Sprite;
  private planet: Sprite;
  
  private tiltTimer = 0;
  private tiltDirection = true;

  public container: Container;

  constructor(
    private center: IPoint,
    resources: Partial<Record<string, LoaderResource>>
  ) {

    this.title = new Sprite(resources.title.texture);
    this.title.x = center.x;
    this.title.y = center.y;
    this.title.anchor.x = 0.5;
    this.title.anchor.y = 0.5;
    this.title.angle = -10;

    this.gameOver = new Sprite(resources.gameOver.texture);
    this.gameOver.x = center.x;
    this.gameOver.y = center.y;
    this.gameOver.anchor.x = 0.5;
    this.gameOver.anchor.y = 0.5;
    this.gameOver.visible = false;

    this.startButton = new Sprite(resources.startButton.texture);
    this.startButton.x = (-center.x) / 2;
    this.startButton.y = center.y * 1.8;
    this.startSelected = new Sprite(resources.startSelected.texture);
    this.startSelected.x = this.startButton.x;
    this.startSelected.y = this.startButton.y;
    this.startSelected.visible = false;

    this.helpButton = new Sprite(resources.helpButton.texture);
    this.helpButton.x = center.x * 1.666;
    this.helpButton.y = this.startButton.y;
    this.helpSelected = new Sprite(resources.helpSelected.texture);
    this.helpSelected.x = this.helpButton.x;
    this.helpSelected.y = this.helpButton.y;
    this.helpSelected.visible = false;

    this.restartButton = new Sprite(resources.restartButton.texture);
    this.restartButton.x = -(center.x) * 1.3;
    this.restartButton.y = center.y;
    this.restartSelected = new Sprite(resources.restartSelected.texture);
    this.restartSelected.x = this.restartButton.x;
    this.restartSelected.y = this.restartButton.y;
    this.restartSelected.visible = false;
    
    this.titleButton = new Sprite(resources.titleButton.texture);
    this.titleButton.x = center.x * 1.3;
    this.titleButton.y = this.restartButton.y;
    this.titleButton.visible = false;
    this.titleSelected = new Sprite(resources.titleSelected.texture);
    this.titleSelected.x = this.titleButton.x;
    this.titleSelected.y = this.titleButton.y;
    this.titleSelected.visible = false;

    this.howToPlay = new Sprite(resources.howToPlay.texture);
    this.howToPlay.x = -center.x * 0.1;
    this.howToPlay.y = center.y * 0.1;
    this.howToPlay.visible = false;

    this.arrowLeft = new Sprite(resources.arrowLeft.texture);
    this.arrowLeft.x = -center.x * 0.2;
    this.arrowLeft.y = center.y * 1.9;
    this.arrowLeft.visible = false;
  
    this.arrowRight = new Sprite(resources.arrowLeft.texture);
    this.arrowRight.x = center.x * 1.8;
    this.arrowRight.y = this.arrowLeft.y +10;
    this.arrowRight.anchor.x = 0.5;
    this.arrowRight.anchor.y = 0.5;
    this.arrowRight.visible = false;
    this.arrowRight.angle = 180;

    this.planet = new Sprite(resources.planet.texture);
    this.planet.x = center.x * 1.7;
    this.planet.y = center.y * 0.5;
    this.planet.anchor = this.title.anchor;
    this.planet.position = center;

    this.tiltTimer = 0;
    this.tiltDirection = true;

    this.container = new Container();
    this.container.addChild(this.title);
    this.container.addChild(this.startButton);
    this.container.addChild(this.startSelected);
    this.container.addChild(this.helpButton);
    this.container.addChild(this.helpSelected);
    this.container.addChild(this.gameOver);
    this.container.addChild(this.restartButton);
    this.container.addChild(this.restartSelected);
    this.container.addChild(this.titleButton);
    this.container.addChild(this.titleSelected);
    this.container.addChild(this.howToPlay);
    this.container.addChild(this.arrowLeft);
    this.container.addChild(this.arrowRight);
    this.container.addChild(this.planet);
  }
    update() {
        if(this.title.visible){
            if(this.tiltTimer < 60){
              if(this.tiltDirection){
                this.title.rotation += 0.005;          
              }
              else{
                this.title.rotation -= 0.005;
              }
              this.planet.rotation = -this.title.rotation * 2.5;
              this.tiltTimer++;
            }
            else{
              if(this.tiltDirection){
                this.tiltDirection = false;
              }
              else{
                this.tiltDirection = true;
              }
              this.tiltTimer = 0;
            }
        
          //const [horizontal, vertical] = input.getGamepadJoystick();
          
            if(Input.isDown('a') || Input.isDown('ArrowLeft')){ //if(horizontal<0)??
              this.startButton.visible = false;
              this.startSelected.visible = true;
      
              this.helpButton.visible = true;
              this.helpSelected.visible = false;
            }
      
            if(Input.isDown('d') || Input.isDown('ArrowRight')){ //if(horizontal>0)??
              this.startButton.visible = true;
              this.startSelected.visible = false;
      
              this.helpButton.visible = false;
              this.helpSelected.visible = true;
            }
      
            if(Input.isDown('Enter') && this.startSelected.visible == true){
              //Start game
            }
      
            else if(Input.isDown('Enter') && this.helpSelected.visible == true){
              disableTitleScreen(this.title, this.startButton, this.startSelected, this.helpButton, this.helpSelected, this.planet);
              this.howToPlay.visible = true;
              this.arrowLeft.visible = true;
              this.arrowRight.visible = true;
            }
          }
          else if(this.gameOver.visible){
            
            if(this.gameOver.angle<180){
              this.gameOver.rotation += 0.01;
              this.gameOver.y += 2.5;
            }
            else{
              this.gameOver.y += 0.8;
            }
      
            if(this.gameOver.y >= this.center.y * 2){
              this.titleButton.visible = true;
              this.restartButton.visible = true;
      
              if(Input.isDown('a') || Input.isDown('ArrowLeft')){ 
                this.restartButton.visible = false;
                this.restartSelected.visible = true;
        
                this.titleButton.visible = true;
                this.titleSelected.visible = false;
              }
        
              if(Input.isDown('d') || Input.isDown('ArrowRight')){ 
                this.restartButton.visible = true;
                this.restartSelected.visible = false;
        
                this.titleButton.visible = false;
                this.titleSelected.visible = true;
              }
      
              if(Input.isDown('Enter') && this.titleSelected.visible == true){
                disableGameOverScreen(this.gameOver, this.restartButton, this.restartSelected, this.titleButton, this.titleSelected, this.center)
                enableTitleScreen(this.title, this.startButton, this.startSelected, this.helpButton, this.helpSelected, this.planet);
              }
              
              if(Input.isDown('Enter') && this.restartSelected.visible == true){
                //restart game
              }
            }
      
          }
      
          else if(this.howToPlay.visible){
            if(Input.isDown('a') || Input.isDown('ArrowLeft')){
              this.howToPlay.visible = false;
              this.arrowLeft.visible = false;
              this.arrowRight.visible = false;
      
              enableTitleScreen(this.title, this.startButton, this.startSelected, this.helpButton, this.helpSelected, this.planet);
            }
          }
      }
  }


function enableTitleScreen(title: Sprite, startbutton: Sprite, startselected: Sprite, helpbutton: Sprite, helpselected: Sprite, planet: Sprite){
  title.visible = true;
  startbutton.visible = true;
  startselected.visible = false;

  helpbutton.visible = true;
  helpselected.visible = false;

  planet.visible = true;
}

function disableTitleScreen(title: Sprite, startbutton: Sprite, startselected: Sprite, helpbutton: Sprite, helpselected: Sprite, planet: Sprite){
  title.visible = false;
  startbutton.visible = false;
  startselected.visible = false;

  helpbutton.visible = false;
  helpselected.visible = false;

  planet.visible = false;
}

function enableGameOverScreen(gameover: Sprite, restartbutton: Sprite, restartselected: Sprite, titlebutton: Sprite, titleselected: Sprite,  center: IPoint){
  gameover.visible = true;
  gameover.angle = 0;
  gameover.y = center.y;

  restartbutton.visible = false;
  restartselected.visible = false;

  titlebutton.visible = false;
  titleselected.visible = false;
}

function disableGameOverScreen(gameover: Sprite, restartbutton: Sprite, restartselected: Sprite, titlebutton: Sprite, titleselected: Sprite, center: IPoint){
  gameover.visible = false;
  gameover.angle = 0;
  gameover.y = center.y;
 
  restartbutton.visible = false;
  restartselected.visible = false;

  titlebutton.visible = false;
  titleselected.visible = false;
}