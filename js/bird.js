class Bird {
  constructor(game) {
    let birdImg_1 = game.imgs.get('bird2_0');
    let birdImg_2 = game.imgs.get('bird2_1');
    let birdImg_3 = game.imgs.get('bird2_2');

    this.w = birdImg_1.width;
    this.h = birdImg_1.height;

    this.birdImg_1 = birdImg_1;
    this.birdImg_2 = birdImg_2;
    this.birdImg_3 = birdImg_3;
    this.game = game;

    this.init();
  }
  init() {
    let { game } = this;
    // bird 的坐标位置
    this.x = game.canvas.width / 2 - this.w / 2; // 固定 bird 在视图中间, 只是移动背景和管道
    this.y = game.canvas.height / 3; // 初始小鸟的高度
    this.g = 0.5; // 重力加速度
    this.speed = 0; // bird y 方向的初速度
    this.rotate = 0; // bird 旋转的角度
    this.wing = 2; // bird 翅膀的走向
  }
  update() {
    let { game } = this;
    let { height } = game.canvas;
    const landHeight = 120;
    // 速度处理
    this.speed += this.g;
    if (this.speed < 0) {
      // 速度往上的时候, 翅膀进行拍打
      if (game.frame % 2 === 0) {
        // 两帧拍打一次, 减缓拍打速度
        this.wing == 3 ? (this.wing = 1) : this.wing++;
      }
    } else if (this.speed > 0) {
      this.wing = 3;
    } else {
      this.wing = 2;
    }
    // 旋转角度处理
    this.rotate += 3;
    this.rotate = this.rotate > 75 ? 75 : this.rotate; // 角度最大为 75
    // y 坐标处理
    this.y += this.speed;
    // bird 的活动范围, 最大最小高度
    let minHeight = this.w / 2 - 10;
    let maxHeight = height - landHeight - 10;
    this.y < minHeight ? (this.y = minHeight) : null;
    if (this.y >= maxHeight) {
      this.y = maxHeight;
      game.sm.enter(4);
    }
    // 记录 bird 的当前坐标范围, 用于碰撞检测
    // bird 范围相对图片较小, x y 坐标其实是现在 bird 的中心坐标
    this.x1 = this.x - 17;
    this.x2 = this.x + 17;
    this.y1 = this.y - 12;
    this.y2 = this.y + 12;
    this.render();
  }
  fly() {
    this.speed = -6; // 往上的初速度
    this.rotate = -60; // 角度上扬
  }
  render() {
    let { game, x, y, wing, rotate, w, h } = this;
    let { ctx } = game;
    let bird = this[`birdImg_${wing}`];
    ctx.save();
    ctx.translate(x, y); // 移动旋转中心
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.drawImage(bird, -w / 2, -h / 2);
    ctx.restore();
  }
}
