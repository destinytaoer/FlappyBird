class Pipe {
  constructor(game) {
    let pipe_down = game.imgs.get('pipe_down');
    let pipe_up = game.imgs.get('pipe_up');
    this.w = pipe_down.width;
    this.h = pipe_down.height;
    this.pipe_down = pipe_down;
    this.pipe_up = pipe_up;
    this.game = game;

    // 每次生成一个实例时, 就生成一个随机的高度不再变化
    this.h_down = Math.round(Math.random() * 200 + 100); // 范围为 100 - 300

    this.offset = game.canvas.width;
  }
  update(space) {
    this.space = space || 140;
    let { game } = this;
    this.offset -= game.speed;
    let leaveOffset = -this.w;
    if (this.offset < leaveOffset) {
      // 说明管道已经离开了画面
      game.pipes.delete(this);
    }
    this.render();
  }
  render() {
    let { game, pipe_down, pipe_up } = this;
    let { width, height } = game.canvas;
    this.space = 140;
    const landHeight = (height * 124) / 512;
    this.h_up = height - landHeight - this.h_down - this.space;
    game.ctx.drawImage(
      pipe_down,
      0, // sx
      this.h - this.h_down, //sy
      this.w, // swidth
      this.h_down, // sheight
      this.offset, // dx
      0, // dy
      this.w, // dwidth
      this.h_down // dheight
    );
    game.ctx.drawImage(
      pipe_up,
      0,
      0,
      this.w,
      this.h_up,
      this.offset,
      this.h_down + this.space,
      this.w,
      this.h_up
    );
  }
}
