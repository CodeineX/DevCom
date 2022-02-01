export default class Title {
  constructor() {
    this.image = document.getElementById("titleImage");
  }

  draw(ctx) {
    //drawing title
    ctx.drawImage(this.image, 0, 0);
  }
}
