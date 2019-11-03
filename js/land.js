class Land {
  constructor(game) {
    let bgImg = game.imgs.get('ground');
    this.w = bgImg.width;
    this.h = bgImg.height;
    this.bgImg = bgImg;
    this.game = game;

    // 由背景图得到 landHeight 为 120
    this.landHeight = 120;

    this.offset = 0;
  }
  update() {
    this.offset -= this.game.speed;
    if (Math.abs(this.offset) >= this.game.canvas.width) {
      this.offset = this.game.canvas.width + this.offset;
    }
    this.render();
  }
  render() {
    let { game, bgImg, landHeight } = this;
    let { width, height } = game.canvas;
    game.ctx.drawImage(
      bgImg,
      this.offset,
      height - landHeight,
      width,
      landHeight
    );
    game.ctx.drawImage(
      bgImg,
      width + this.offset,
      height - landHeight,
      width,
      landHeight
    );
  }
}
