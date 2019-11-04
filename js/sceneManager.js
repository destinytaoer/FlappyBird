// 场景管理器, 管理各种场景, 以及每一帧画面的渲染
class SceneManager {
  constructor(game) {
    game.bg = new Background(game);
    game.land = new Land(game);
    game.pipes = new Set();
    game.bird = new Bird(game);
    this.game = game;
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
        this.birdImg = game.imgs.get('bird2_1');
        this.birdX = (width - this.birdImg.width) / 2;
        this.birdY = (height - this.birdImg.height) / 2;
        this.birdMaxH = this.btnH - this.birdImg.height - 20;
        this.birdMinH = this.birdMaxH - 80;
        this.birdChangeY = 2;
        break;
      case 2:
        game.speed = 1;
        break;
      case 3:
        break;
      case 4:
        break;
    }
  }
  update() {
    // 根据不同的场景绘制不同的画面
    let { game } = this;
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
        game.ctx.drawImage(this.titleImg, this.titleX, this.titleY);
        // 绘制小鸟
        if (this.birdY >= this.birdMaxH || this.birdY <= this.birdMinH) {
          this.birdChangeY = -this.birdChangeY;
        }
        this.birdY += this.birdChangeY;
        game.ctx.drawImage(this.birdImg, this.birdX, this.birdY);
        // 绘制按钮
        this.btnY <= this.btnH ? (this.btnY = this.btnH) : (this.btnY -= 6.5);
        game.ctx.drawImage(this.btnImg, this.btnX, this.btnY);
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
    }
    // let init = true;
    // const firstPipe = 50;
    // this.bg.update(); // 背景更新
    // this.land.update(); // 地面的更新
    // if (init && this.frame === firstPipe) {
    //   // 定义管道的首次出现
    //   this.pipes.add(new Pipe(this));
    //   this.frame = 0;
    //   init = false;
    // }
    // if (this.frame === this.pipeSpeed) {
    //   this.frame = 0;
    //   // 出现一个管道
    //   let pipe = new Pipe(this);
    //   this.pipes.add(pipe);
    // }
    // // 将存放的管道都进行更新
    // this.pipes.forEach(pipe => pipe.update());
    // this.bird.update(); // 小鸟的更新
  }
  bindEvents() {}
}
