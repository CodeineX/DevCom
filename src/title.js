export default class Title {
  constructor() {
    this.image = document.getElementById("titleImage");
  }

  draw(ctx) {
    ctx.drawImage(this.image, 0, 0);
  }
}
