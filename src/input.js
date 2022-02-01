export default class InputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 37: //left arrow key
          paddle.moveLeft();
          break;

        case 39: //right arrow key
          paddle.moveRight();
          break;

        case 27: //esc key
          game.togglePause();
          break;

        case 32:// spacebar
          game.start();
          break;

        default:
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 37: //left arrow key
          if (paddle.speed < 0) paddle.stop();
          break;

        case 39: //right arrow key
          if (paddle.speed > 0) paddle.stop();
          break;

        default:
          break;
      }
    });
  }
}
