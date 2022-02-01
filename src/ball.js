import { detectCollision } from "/DevCom/src/collisionDetection.js";

const lossOfLife = new sound("/DevCom/assets/music/lossOfLife.mp3"); //to be played when ball hits floor

export default class Ball {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.image = document.getElementById("img_ball");

    this.size = 20; //diameter of ball

    this.game = game;

    this.reset();
  }

  reset() {
    this.position = {
      x: 0, //initial X-position of top left corner ofball
      y: this.gameHeight - 80 //initial Y-position of top left corner of ball
    };

    if(this.game.currentLevel === 0){
      this.speed = {
        x: 1.25, //initial speed in x direction for level 1
        y: -1.75 //initial speed in y direction for level 1
      }
    }

    if(this.game.currentLevel === 1 ||
      this.game.currentLevel === 2){
      this.speed = {
        x: 2, //initial speed in x direction for level 2 and 3
        y: -3 //initial speed in y direction for level 2 and 3
      }
    }
  }

  draw(ctx) {
    //drawing the ball
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update() {
    this.position.x += this.speed.x; //updating position of ball in X-direction
    this.position.y += this.speed.y; //updating position of ball in Y-direction

    //collision with Right/Left boundaries
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    //collision with Top boundary
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    //collision with Bottom boundary resulting in loss of life
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      lossOfLife.play();
      this.reset();
    }

    //collision with Paddle
    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y; //reversing Y-direction speed on collision with paddle
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
//implementing sound
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}
