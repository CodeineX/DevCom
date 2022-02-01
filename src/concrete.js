import {detectCollision} from "/DevCom/src/collisionDetection.js";


export default class Concrete {
  constructor(game, position) {
    this.concrete = document.getElementById("concrete_brick");
    this.broken = document.getElementById("broken_concrete");

    this.game = game;

    this.position = position;
    this.width = 100;
    this.height = 40;

    this.hitOnce = false;
    this.markedForDeletion = false;
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;

      if(this.hitOnce == false){
        this.hitOnce = true;
      } 
      else{
        this.markedForDeletion = true;
      } 
    }
  }

  draw(ctx) {
    if(this.hitOnce == false){
        ctx.drawImage(
            this.concrete,
            this.position.x,
            this.position.y,
            this.width,
            this.height
          );
    }

    else{
        ctx.drawImage(
            this.broken,
            this.position.x,
            this.position.y,
            this.width,
            this.height
          );
    }

  }
}