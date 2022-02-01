import {detectCollision} from "/DevCom/src/collisionDetection.js";


export default class Concrete {
  constructor(game, position) {
    this.concrete = document.getElementById("concrete_brick");
    this.broken = document.getElementById("broken_concrete");

    this.game = game;

    //position and dimensions of brick
    this.position = position;
    this.width = 100;
    this.height = 40;

    this.hitOnce = false; //because it takes 2 hits for a concrete brick to break
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
        this.game.score += 20;
      } 
    }
  }

  draw(ctx) {
    if(this.hitOnce == false){
        //drawing concrete brick
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
            //brawing smashed concrete brick
            this.broken,
            this.position.x,
            this.position.y,
            this.width,
            this.height
          );
    }

  }
}