import Paddle from "/DevCom/src/paddle.js";
import InputHandler from "/DevCom/src/input.js";
import Ball from "/DevCom/src/ball.js";

import { buildLevel } from "/DevCom/src/levels.js";
import Level1, { Level2, Level3 } from "/DevCom/src/levels.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.heart = document.getElementById("heart");

    this.gamestate = GAMESTATE.MENU;

    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.lives = 3;

    this.gameObjects = [];
    this.bricks = [];

    new InputHandler(this.paddle, this);

    this.level1 = new Level1(this);
    this.level2 = new Level2(this);
    this.level3 = new Level3(this);

    this.levels = [this.level1, this.level2, this.level3];
    this.currentLevel = 0;
  }

  start() {
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    )
      return;

    this.ball.reset();

    this.bricks = buildLevel(
      this,
      this.levels[this.currentLevel].brickArrangement
    );

    this.gameObjects = [this.paddle, this.ball];

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

    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }

    [...this.gameObjects, ...this.bricks].forEach((object) =>
      object.update(deltaTime)
    );

    this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));

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

    if (
      this.gamestate === GAMESTATE.RUNNING ||
      this.gamestate === GAMESTATE.NEWLEVEL
    ) {
      for (let i = 0; i < this.lives; i++) {
        ctx.drawImage(this.heart, 0 + 30 * i, 0, 30, 30);
      }
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
