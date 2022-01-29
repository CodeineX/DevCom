import Game from "/DevCom/src/game.js";
import Title from "/src/title.js";

let titleCanvas = document.getElementById("titleScreen");
let tit_ctx = titleCanvas.getContext("2d");

let Canvas = document.getElementById("gameScreen");
let ctx = Canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let title = new Title();
let game = new Game(GAME_WIDTH, GAME_HEIGHT);

game.start();

let lastTime = 0;

function gameLoop(timeStamp) {
  title.draw(tit_ctx);

  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT); // always draw anything on canvas after clearing the canvas and not before it!!!

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
