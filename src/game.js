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
  NEWLEVEL: 4,
  GAMECOMPLETE: 5
};

const gameTheme = new sound("/DevCom/assets/music/Theme.mp3");
const gameOver = new sound("/DevCom/assets/music/gameOver.mp3");
const levelUp = new sound("/DevCom/assets/music/LevelUp.mp3");

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.heart = document.getElementById("heart");

    this.gamestate = GAMESTATE.MENU;

    this.score = 0;

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
    this.maxLevel = this.levels.length - 1;

    this.scores = [0];
    this.highScore = Math.max(...this.scores);
  }

  start() {
  
    this.InitialSpeed = this.levels[this.currentLevel].InitialSpeed;
    this.lives = 3;
    gameTheme.play();

    if (
      this.gamestate === GAMESTATE.RUNNING ||
      this.gamestate === GAMESTATE.PAUSED
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
      gameTheme.stop();
      gameOver.play();
      this.lives = -1
      this.gamestate = GAMESTATE.GAMEOVER;
      this.scores.push(this.score);
      return;
    }

    if (this.gamestate !== GAMESTATE.RUNNING) return;

    if (this.bricks.length === 0 && this.currentLevel < this.maxLevel) {
      this.nextLevel();
    }

    if (this.bricks.length === 0 && this.currentLevel === this.maxLevel) {
      this.gamestate = GAMESTATE.GAMECOMPLETE;
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

      ctx.font = "bold 30px Agency FB";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.RUNNING) {
      ctx.font = "bold 15px Agency FB";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText("Score = ", this.gameWidth - 50, 15 );
      ctx.fillText(this.score, this.gameWidth -50 + 30, 15 );
    }

    if (this.gamestate === GAMESTATE.NEWLEVEL) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      ctx.font = "bold 30px Agency FB";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Level Up. Press SPACEBAR to go to Next Level.",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
      ctx.fillText("Score: ", this.gameWidth / 2, this.gameHeight / 2 + 30 );
      ctx.fillText(this.score, this.gameWidth / 2 + 50, this.gameHeight / 2 + 30 );
    }

    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      ctx.font = "bold 30px Agency FB";
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

      ctx.font = "bold 30px Agency FB";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME-OVER", this.gameWidth / 2, this.gameHeight / 2);
      ctx.fillText("Press SPACEBAR to Restart", this.gameWidth / 2, this.gameHeight / 2 + 30 );

      this.currentLevel = 0;
    }

    if (this.gamestate === GAMESTATE.GAMECOMPLETE) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fill();

      ctx.font = "bold 30px Agency FB";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Congratulations On Completing All Levels.", this.gameWidth / 2, this.gameHeight / 2);
      ctx.fillText("Press SPACEBAR to Play Again", this.gameWidth / 2, this.gameHeight / 2 + 30 );

      this.currentLevel = 0;
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

  nextLevel() {
    this.score += 5*this.lives;
    this.currentLevel++;
    gameTheme.stop();
    levelUp.play();
    this.gamestate = GAMESTATE.NEWLEVEL;
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}

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
