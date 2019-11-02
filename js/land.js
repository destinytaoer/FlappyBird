class Land {
  constructor(game) {
    let bgImg = game.imgs.get('ground');
    this.w = bgImg.width;
    this.h = bgImg.height;
    this.bgImg = bgImg;
    this.game = game;

    // 由于背景图片与地面图片是分开的, 而背景图片是直接按照屏幕大小缩放的,所以要创建的地面图片必须是按比例来计算的
    this.landScale = 124 / 512;

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
    let landHeight = height * this.landScale;
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
