export default class Paddle {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.width = 150; //paddle width
    this.height = 15; //paddle height

    this.speed = 0; //initial speed
    this.maxSpeed = 8; //speed of paddle while moving

    this.position = {
      x: game.gameWidth / 2 - this.width / 2, //x coordinate of top left corner of paddle
      y: game.gameHeight - this.height - 7 //y coordinate of top left corner of paddle
    };
  }
  moveLeft() {
    this.speed = -this.maxSpeed; //-ve speed is for left
  }

  moveRight() {
    this.speed = this.maxSpeed; //+ve speed is for right
  }

  stop() {
    this.speed = 0; //stopping the paddle
  }

  draw(ctx) {
    ctx.fillStyle = "#966F33";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height); //drawing the paddle
  }

  update(deltaTime) {
    this.position.x += this.speed; //changing X-position of paddle

    if (this.position.x < 0) this.position.x = 0; //paddle crossed left boundary

    if (this.position.x + this.width > this.gameWidth)
      //paddle crossed right boundary
      this.position.x = this.gameWidth - this.width;
  }
}
