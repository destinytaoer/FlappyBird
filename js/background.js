class Background {
  constructor(game) {
    let bgImg = game.imgs.get('bg_day');
    this.w = bgImg.width;
    this.h = bgImg.height;
    this.bgImg = bgImg;
    this.game = game;

    this.offset = 0; // 用于动画的偏移
  }
  update() {
    this.offset -= this.game.speed; // 从右往左走
    if (Math.abs(this.offset) >= this.game.canvas.width) {
      this.offset = this.game.canvas.width + this.offset;
    }
    this.render();
  }
  render() {
    let { game, bgImg } = this;
    let { width, height } = game.canvas;
    game.ctx.drawImage(bgImg, this.offset, 0, width, height);
    // 再补充一张用于动画
    game.ctx.drawImage(bgImg, width + this.offset, 0, width, height);
  }
}
