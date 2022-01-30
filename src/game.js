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
  }

  start() {
    this.gamestate = GAMESTATE.RUNNING;

    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.level1 = new Level1(this);
    this.level2 = new Level2(this);
    this.level3 = new Level3(this);

    let bricks = buildLevel(this, this.level1.brickArrangement);

    this.gameObjects = [this.paddle, this.ball, ...bricks];

    new InputHandler(this.paddle, this);
  }

  update(deltaTime) {
    if (this.gamestate === GAMESTATE.PAUSED) return;

    this.gameObjects.forEach((object) => object.update(deltaTime));

    this.gameObjects = this.gameObjects.filter(
      (objects) => !objects.markedForDeletion
    );
  }

  draw(ctx) {
    this.gameObjects.forEach((object) => object.draw(ctx));
  }
}
