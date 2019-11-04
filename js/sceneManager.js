// 场景管理器, 管理各种场景, 以及每一帧画面的渲染
class SceneManager {
  constructor(game) {
    game.bg = new Background(game);
    game.land = new Land(game);
    game.pipes = new Set();
    game.bird = new Bird(game);
    this.game = game;
    this.bindEvents();
  }
  enter(sceneNo) {
    // 根据传入的场景编号, 改变一些状态
    let { game } = this;
    game.sceneNo = sceneNo;
    let { width, height } = game.canvas;
    switch (sceneNo) {
      case 1:
        // 标题
        this.titleImg = game.imgs.get('title');
        this.titleX = (width - this.titleImg.width) / 2;
        this.titleY = -this.titleImg.height; // 初始消失
        this.titleH = height / 4;
        // 按钮
        this.btnImg = game.imgs.get('button_play');
        this.btnX = (width - this.btnImg.width) / 2;
        this.btnY = height; // 初始消失
        this.btnH = (height / 15) * 9;
        // 小鸟
        this.birdImg = game.imgs.get('bird2_0');
        this.birdX = (width - this.birdImg.width) / 2;
        this.birdY = (height - this.birdImg.height) / 2;
        this.birdMaxH = this.btnH - this.birdImg.height - 20;
        this.birdMinH = this.birdMaxH - 80;
        this.birdChangeY = 2;
        break;
      case 2:
        // tap 示例图片
        this.tapImg = game.imgs.get('tap');
        this.tapX = (width - this.tapImg.width) / 2;
        this.tapY = (height - this.tapImg.height) / 2;
        this.tapAlpha = 1; // 初始透明度
        this.tapChangeAlpha = 0.05;
        // 小鸟
        this.birdX = (width - this.birdImg.width) / 2;
        this.birdY = this.tapY - 100;
        break;
      case 3:
        game.speed = 1; // 给定速度,让背景开始移动
        this.pipeTime = 0; // 记录 pipe 出现后的帧数,达到一定值时,再出现一个 pipe
        this.firstPipe = 50; // 第一次出现 pipe 出现的帧数
        this.initFrame = game.frame; // 记录当前帧数
        break;
      case 4:
        break;
    }
  }
  update() {
    // 根据不同的场景绘制不同的画面
    let { game } = this;
    let { ctx } = game;
    let { bg, land, pipes, bird } = game;
    // 背景任何场景都需要绘制
    bg.update();
    land.update();
    switch (game.sceneNo) {
      case 1:
        // 开始游戏按钮界面
        // 绘制游戏标题
        this.titleY >= this.titleH
          ? (this.titleY = this.titleH)
          : (this.titleY += 5); // 从上往下的动画
        ctx.drawImage(this.titleImg, this.titleX, this.titleY);
        // 绘制小鸟
        if (this.birdY > this.birdMaxH || this.birdY < this.birdMinH) {
          this.birdChangeY *= -1;
        }
        this.birdY += this.birdChangeY;
        ctx.drawImage(this.birdImg, this.birdX, this.birdY);
        // 绘制按钮
        this.btnY <= this.btnH ? (this.btnY = this.btnH) : (this.btnY -= 6.5);
        ctx.drawImage(this.btnImg, this.btnX, this.btnY);
        break;
      case 2:
        // 新手 tap 示例界面
        ctx.drawImage(this.birdImg, this.birdX, this.birdY);
        ctx.save();
        this.tapAlpha -= this.tapChangeAlpha;
        if (this.tapAlpha < this.tapChangeAlpha + 0.01 || this.tapAlpha > 1) {
          // 这里不能变成 0, 变成 0 会出现闪烁
          this.tapChangeAlpha *= -1;
        }
        ctx.globalAlpha = this.tapAlpha;
        ctx.drawImage(this.tapImg, this.tapX, this.tapY);
        ctx.restore();
        break;
      case 3:
        // 开始游戏
        if (game.frame - this.initFrame === this.firstPipe) {
          // 定义管道的首次出现
          pipes.add(new Pipe(game));
        } else if (this.pipeTime === game.pipeSpeed) {
          this.pipeTime = 0;
          // 出现一个管道
          pipes.add(new Pipe(game));
        } else {
          this.pipeTime++;
        }

        // 将存放的管道都进行更新
        pipes.forEach(pipe => pipe.update());
        bird.update(); // 小鸟的更新
        break;
      case 4:
        break;
    }
  }
  bindEvents() {
    let { game } = this;
    game.canvas.onclick = e => {
      switch (game.sceneNo) {
        case 1:
          // 点击按钮, 进入下一个场景
          if (
            e.offsetX >= this.btnX + 8 &&
            e.offsetX <= this.btnX + 106 &&
            e.offsetY >= this.btnY + 5 &&
            e.offsetY <= this.btnY + 60
          ) {
            this.enter(2);
          }
          break;
        case 2:
          this.enter(3);
          break;
        case 3:
          game.bird && game.bird.fly();
          break;
        case 4:
          break;
      }
    };
  }
}
