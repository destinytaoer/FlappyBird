class Process {
  constructor(ctx, x, y, w, h) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.w0 = 0;

    this.render();
  }
  update(w) {
    this.w0 = w;
    this.render();
  }
  render() {
    let { ctx, x, y, w, h, w0 } = this;
    ctx.clearRect(x, y, w, h);
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = 'yellowGreen';
    ctx.fillRect(x, y, w0, h);
  }
}
