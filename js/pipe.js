class Pipe {
  constructor(game, space) {
    let pipe_down = game.imgs.get('pipe_down');
    let pipe_up = game.imgs.get('pipe_up');
    this.w = pipe_down.width;
    this.h = pipe_down.height;
    this.pipe_down = pipe_down;
    this.pipe_up = pipe_up;
    this.game = game;
    this.space = space || 140; // 管道之间的空隙
    this.isPass = false; // 判断 bird 是否经过了管道

    // 每次生成一个实例时, 就生成一个随机的高度不再变化
    let { width, height } = game.canvas;
    const landHeight = 120;
    let restHeight = height - landHeight - this.space;
    this.h_down = Math.round(Math.random() * (restHeight - 120) + 60); //范围为 60 - max
    this.h_up = restHeight - this.h_down;
    this.offset = game.canvas.width;
  }
  update() {
    let { game } = this;
    this.offset -= game.speed;
    let leaveOffset = -this.w;
    if (this.offset < leaveOffset) {
      // 说明管道已经离开了画面
      game.pipes.delete(this);
    }
    // 记录管子的边界范围, 用于碰撞检测
    this.x1 = this.offset;
    this.x2 = this.w + this.offset;
    this.y1 = this.h_down;
    this.y2 = this.h_down + this.space;

    // 碰撞检测
    let bird = game.bird;
    if (
      bird.x2 > this.x1 &&
      bird.x1 < this.x2 &&
      (bird.y1 < this.y1 || bird.y2 > this.y2)
    ) {
      // 碰撞到了
      game.stop();
      console.log('game over');
    } else if (bird.x1 > this.x2 && !this.isPass) {
      this.isPass = true;
      game.score++;
    }

    this.render();
  }
  render() {
    let { game, pipe_down, pipe_up } = this;
    game.ctx.drawImage(
      pipe_down,
      0, // sx
      this.h_down > this.h ? 0 : this.h - this.h_down, //sy
      this.w, // swidth
      this.h_down > this.h ? this.h : this.h_down, // sheight
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
      this.h_up > this.h ? this.h : this.h_up,
      this.offset,
      this.h_down + this.space,
      this.w,
      this.h_up
    );
  }
}
