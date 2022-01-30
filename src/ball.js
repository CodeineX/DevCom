import { detectCollision } from "/DevCom/src/collisionDetection.js";

export default class Ball {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.image = document.getElementById("img_ball");

    this.position = {
      x: 0, //initial X-position of top left corner ofball
      y: this.gameHeight - 100 //initial Y-position of top left corner of ball
    };

    this.speed = {
      x: 2, //initial speed of ball in X-direction
      y: -3 //initial speed of ball in Y-direction
    };

    this.size = 25; //diameter of ball

    this.game = game;
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

    //collision with Bottom boundary
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
    }

    //collision with Paddle
    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y; //reversing Y-direction speed on collision with paddle
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
