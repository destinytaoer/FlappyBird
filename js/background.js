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
    if (Math.abs(this.offset) >= this.w) {
      this.offset = this.w + this.offset;
    }
    this.render();
  }
  render() {
    let { game, bgImg, w, h } = this;
    let { width, height } = game.canvas;
    game.ctx.fillStyle = '#4fc0ca';
    // 补充不够图片不够的地方
    game.ctx.fillRect(0, 0, width, height);
    // 保持原比例
    game.ctx.drawImage(bgImg, this.offset, height - h);
    // 再补充两张用于动画
    game.ctx.drawImage(bgImg, w + this.offset, height - h);
    game.ctx.drawImage(bgImg, 2 * w + this.offset, height - h);
  }
}
