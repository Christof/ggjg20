import { Sprite, LoaderResource, IPoint, Container } from 'pixi.js';
import { Input } from './input';

export class Menu {
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
  private smallPlanet: Sprite;
  private menuBackground: Sprite;

  private tiltTimer = 0;
  private tiltDirection = true;

  public container: Container;

  constructor(
    private center: IPoint,
    private resources: Partial<Record<string, LoaderResource>>,
    private startGame: () => void
  ) {

    this.menuBackground = new Sprite(resources.menuBackground.texture);
    this.menuBackground.anchor.x = 0.5;
    this.menuBackground.anchor.y = 0.5;
    this.menuBackground.position = center;

    this.title = new Sprite(resources.title.texture);
    this.title.x = center.x;
    this.title.y = center.y;
    this.title = scaleDown(this.title);
    this.title.anchor.x = 0.5;
    this.title.anchor.y = 0.5;
    this.title.angle = -10;

    this.gameOver = new Sprite(resources.gameOver.texture);
    this.gameOver.anchor.x = 0.5;
    this.gameOver.anchor.y = 0.5;
    this.gameOver.x = center.x;
    this.gameOver.y = center.y * 0.1;
    //this.gameOver = scaleDown(this.gameOver);
    this.gameOver.visible = false;

    this.startButton = new Sprite(resources.startButton.texture);
    this.startButton.x = center.x * 0.5;
    this.startButton.y = center.y * 1.5;
    this.startButton = scaleDown(this.startButton);

    this.startButton.interactive = true;
    this.startButton.hitArea = new PIXI.Rectangle(
      0,
      0,
      this.startButton.width * 2,
      this.startButton.height * 2
    );
    this.startButton.on('mouseover', () => {
      this.startButton.texture = this.resources.startSelected.texture;
      this.helpButton.texture = this.resources.helpButton.texture;
    });

    this.startButton.on('mouseout', () => {
      this.startButton.texture = this.resources.startButton.texture;
    });

    this.startButton.on("mousedown", () => {
      this.disableTitleScreen();
      });


    this.startSelected = new Sprite(resources.startSelected.texture);
    this.startSelected.x = this.startButton.x;
    this.startSelected.y = this.startButton.y;
    this.startSelected = scaleDown(this.startSelected);
    this.startSelected.visible = false;

    this.helpButton = new Sprite(resources.helpButton.texture);
    this.helpButton.x = center.x * 1.4;
    this.helpButton.y = this.startButton.y;
    this.helpButton = scaleDown(this.helpButton);
    this.helpSelected = new Sprite(resources.helpSelected.texture);
    this.helpSelected.x = this.helpButton.x;
    this.helpSelected.y = this.helpButton.y;
    this.helpSelected = scaleDown(this.helpSelected);
    this.helpSelected.visible = false;

    this.helpButton.interactive = true;
    this.helpButton.hitArea = new PIXI.Rectangle(
      0,
      0,
      this.helpButton.width * 2,
      this.helpButton.height * 2
    );
    this.helpButton.on('mouseover', () => {
      this.helpButton.texture = this.resources.helpSelected.texture;
      this.startButton.texture = this.resources.startButton.texture;
    });

    this.helpButton.on('mouseout', () => {
      this.helpButton.texture = this.resources.helpButton.texture;
    });

    this.restartButton = new Sprite(resources.restartButton.texture);
    this.restartButton.x = this.startButton.x;
    this.restartButton.y = center.y;
    this.restartButton = scaleDown(this.restartButton);
    this.restartButton.visible = false;
    this.restartSelected = new Sprite(resources.restartSelected.texture);
    this.restartSelected.x = this.restartButton.x;
    this.restartSelected.y = this.restartButton.y;
    this.restartSelected = scaleDown(this.restartSelected);
    this.restartSelected.visible = false;

    this.titleButton = new Sprite(resources.titleButton.texture);
    this.titleButton.x = this.helpButton.x - 20;
    this.titleButton.y = this.restartButton.y;
    this.titleButton = scaleDown(this.titleButton);
    this.titleButton.visible = false;
    this.titleSelected = new Sprite(resources.titleSelected.texture);
    this.titleSelected.x = this.titleButton.x;
    this.titleSelected.y = this.titleButton.y;
    this.titleSelected = scaleDown(this.titleSelected);
    this.titleSelected.visible = false;

    this.howToPlay = new Sprite(resources.howToPlay.texture);
    this.howToPlay.x = center.x * 0.1;
    this.howToPlay.y = center.y * 0.1;
    this.howToPlay = scaleDown(this.howToPlay);
    this.howToPlay.visible = false;

    this.arrowLeft = new Sprite(resources.arrowLeft.texture);
    this.arrowLeft.x = this.startButton.x;
    this.arrowLeft.y = center.y * 1.6;
    this.arrowLeft.visible = false;

    this.arrowRight = new Sprite(resources.arrowLeft.texture);
    this.arrowRight.x = this.helpButton.x + 30;
    this.arrowRight.y = this.arrowLeft.y + 10;
    this.arrowRight.anchor.x = 0.5;
    this.arrowRight.anchor.y = 0.5;
    this.arrowRight.visible = false;
    this.arrowRight.angle = 180;

    this.smallPlanet = new Sprite(resources.smallPlanet.texture);
    this.smallPlanet.x = center.x * 1.3;
    this.smallPlanet.y = center.y * 0.7;
    this.smallPlanet.anchor = this.title.anchor;

    this.tiltTimer = 0;
    this.tiltDirection = true;

    this.container = new Container();
    this.container.addChild(this.menuBackground);
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
    this.container.addChild(this.smallPlanet);
  }
  update() {
    const [horizontal, vertical] = Input.getGamepadJoystick();
    if (this.title.visible) {
      if (this.tiltTimer < 60) {
        if (this.tiltDirection) {
          this.title.rotation += 0.005;
        } else {
          this.title.rotation -= 0.005;
        }
        this.smallPlanet.rotation = -this.title.rotation * 2.5;
        this.tiltTimer++;
      } else {
        if (this.tiltDirection) {
          this.tiltDirection = false;
        } else {
          this.tiltDirection = true;
        }
        this.tiltTimer = 0;
      }

      if (Input.isDown('a') || Input.isDown('ArrowLeft') || horizontal < -0.5) {
        //if(horizontal<0)??
        this.startButton.texture = this.resources.startSelected.texture;
        this.helpButton.texture = this.resources.helpButton.texture;
      }

      if (Input.isDown('d') || Input.isDown('ArrowRight') || horizontal > 0.5) {
        //if(horizontal>0)??
        this.startButton.texture = this.resources.startButton.texture;
        this.helpButton.texture = this.resources.helpSelected.texture;
      }

      if ((Input.isDown("Enter") || Input.isGamepadAButtonDown()) && this.startSelected.visible == true) {
        this.disableTitleScreen();

        this.startGame();
      } else if ((Input.isDown("Enter") || Input.isGamepadAButtonDown()) && this.helpSelected.visible == true) {
        this.disableTitleScreen();
        this.howToPlay.visible = true;
        this.arrowLeft.visible = true;
        this.arrowRight.visible = true;
        this.menuBackground.visible = true;
      }
    } else if (this.gameOver.visible) {
      if (this.gameOver.angle < 180) {
        this.gameOver.rotation += 0.01;
        this.gameOver.y += 2.5;
      } else {
        this.gameOver.y += 0.8;
      }

      if (this.gameOver.y >= this.center.y * 2) {
        this.titleButton.visible = true;
        this.restartButton.visible = true;

        if (
          Input.isDown('a') ||
          Input.isDown('ArrowLeft') ||
          horizontal < -0.5
        ) {
          this.restartButton.visible = false;
          this.restartSelected.visible = true;

          this.titleButton.visible = true;
          this.titleSelected.visible = false;
        }

        if (
          Input.isDown('d') ||
          Input.isDown('ArrowRight') ||
          horizontal > 0.5
        ) {
          this.restartButton.visible = true;
          this.restartSelected.visible = false;

          this.titleButton.visible = false;
          this.titleSelected.visible = true;
        }

        if ((Input.isDown("Enter") || Input.isGamepadAButtonDown()) && this.titleSelected.visible == true) {
          this.disableGameOverScreen();
          this.enableTitleScreen();
        }

        if (
          (Input.isDown('Enter') || Input.isGamepadAButtonDown()) &&
          this.restartSelected.visible == true
        ) {
          //restart game
          this.disableGameOverScreen();

          this.startGame();
        }
      }
    } else if (this.howToPlay.visible) {
      if (Input.isDown('a') || Input.isDown('ArrowLeft') || horizontal < -0.5) {
        this.howToPlay.visible = false;
        this.arrowLeft.visible = false;
        this.arrowRight.visible = false;

        this.enableTitleScreen();
      }
    }
  }

  enableTitleScreen() {
    this.title.visible = true;
    this.startButton.visible = true;
    this.startSelected.visible = false;
  
    this.helpButton.visible = true;
    this.helpSelected.visible = false;
  
    this.smallPlanet.visible = true;
    this.menuBackground.visible = true;
  }
  
  disableTitleScreen() {
    this.title.visible = false;
    this.startButton.visible = false;
    this.startSelected.visible = false;
  
    this.helpButton.visible = false;
    this.helpSelected.visible = false;
  
    this.smallPlanet.visible = false;
    this.menuBackground.visible = false;
  }
  
    public enableGameOverScreen(

  ) {
    console.log("game over kek");
    this.gameOver.visible = true;
    this.gameOver.angle = 0;
    this.gameOver.y = this.center.y * 0.1;
  
    this.restartButton.visible = false;
    this.restartSelected.visible = false;
  
    this.titleButton.visible = false;
    this.titleSelected.visible = false;
    this.menuBackground.visible = true;
    
  }
  
  disableGameOverScreen() {
    this.gameOver.visible = false;
    this.gameOver.angle = 0;
    this.gameOver.y = this.center.y * 0.1;
  
    this.restartButton.visible = false;
    this.restartSelected.visible = false;
  
    this.titleButton.visible = false;
    this.titleSelected.visible = false;
    this.menuBackground.visible = false;
  }
  

}

function scaleDown(sprite: Sprite) {
    sprite.width /= 2;
    sprite.height /= 2;
  
    return sprite;
  }
