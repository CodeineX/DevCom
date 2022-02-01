import {detectCollision} from "/DevCom/src/collisionDetection.js";


export default class Brick {
  constructor(game, position) {
    this.simple = document.getElementById("simple_brick");

    this.game = game;

    //position and dimensions of brick
    this.position = position;
    this.width = 100;
    this.height = 40;

    this.markedForDeletion = false;
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.game.score += 10;
      this.markedForDeletion = true; //when ball hits a brick, it is marked for deletion and the brick does not show up thereupon 
    }
  }

  draw(ctx) {
    //drawing simple brick
    ctx.drawImage(
      this.simple,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}