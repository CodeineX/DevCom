import Paddle from "/DevCom/src/paddle.js";
import InputHandler from "/DevCom/src/input.js";
import Ball from "/DevCom/src/ball.js";

import { buildLevel } from "/DevCom/src/levels.js";
import Level1, { Level2, Level3 } from "/DevCom/src/levels.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gamestate = GAMESTATE.MENU;

    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.lives = 1;

    this.gameObjects = [];
    new InputHandler(this.paddle, this);

    this.level1 = new Level1(this);
    this.level2 = new Level2(this);
    this.level3 = new Level3(this);
  }

  start() {
    if (this.gamestate !== GAMESTATE.MENU) return;


    let bricks = buildLevel(this, this.level1.brickArrangement);

    this.gameObjects = [this.paddle, this.ball, ...bricks];

    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) {
      this.gamestate = GAMESTATE.GAMEOVER;
    }

    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    this.gameObjects.forEach((object) => object.update(deltaTime));

    this.gameObjects = this.gameObjects.filter(
      (objects) => !objects.markedForDeletion
    );
  }

  draw(ctx) {
    this.gameObjects.forEach((object) => object.draw(ctx));

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();

      ctx.font = "30px AgencyFB";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      ctx.font = "30px AgencyFB";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACEBAR To Play.",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fill();

      ctx.font = "30px AgencyFB";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME-OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
