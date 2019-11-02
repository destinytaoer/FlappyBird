class Land {
  constructor(game) {
    let bgImg = game.imgs.get('ground');
    this.w = bgImg.width;
    this.h = bgImg.height;
    this.bgImg = bgImg;
    this.game = game;

    this.offset = 0;
  }
  update(speed) {
    this.offset -= speed;
    if (Math.abs(this.offset) >= this.game.canvas.width) {
      this.offset = this.game.canvas.width + this.offset;
    }
    this.render();
  }
  render() {
    let { game, bgImg } = this;
    let { width, height } = game.canvas;
    game.ctx.drawImage(bgImg, this.offset, height - 180, width, 180);
    game.ctx.drawImage(bgImg, width + this.offset, height - 180, width, 180);
  }
}
