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
        this.titleChangeY = 5;
        // 按钮
        this.btnImg = game.imgs.get('button_play');
        this.btnX = (width - this.btnImg.width) / 2;
        this.btnY = height; // 初始消失
        this.btnH = (height / 15) * 9;
        this.btnChangeY = 6.5;
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
        // 游戏开始进行所有的初始化
        game.bird.init();
        game.pipes = new Set();
        game.score = 0;
        game.speed = 1; // 给定速度,让背景开始移动
        this.pipeTime = 0; // 记录 pipe 出现后的帧数,达到一定值时,再出现一个 pipe
        this.firstPipe = 50; // 第一次出现 pipe 出现的帧数
        this.initFrame = game.frame; // 记录当前帧数
        break;
      case 4:
        game.speed = 0; // 停止移动
        // 获取到当前 bird 的 x,y 坐标
        this.birdX = game.bird.x;
        this.birdY = game.bird.y;
        this.birdW = this.birdImg.width;
        this.birdH = this.birdImg.height;
        this.birdRotate = game.bird.rotate;
        this.birdAlpha = 1; // 初始透明度
        this.birdChangeAlpha = 0.05;
        this.time = 100;
        this.initFrame = game.frame;
        break;
      case 5:
        this.birdMaxH = height;
        this.birdChangeY = 1;
        this.birdRotate = 60;
        break;
      case 6:
        // 游戏结束文字
        this.gameOverImg = game.imgs.get('text_game_over');
        this.gameOverX = (width - this.gameOverImg.width) / 2;
        this.gameOverY = -this.gameOverImg.height; // 初始消失
        this.gameOverH = height / 4;
        this.gameOverChangeY = 5;
        // 颁奖面板
        this.panelImg = game.imgs.get('panel');
        this.panelW = this.panelImg.width / 2;
        this.panelH = this.panelImg.height / 2;
        this.panelX = (width - this.panelW) / 2;
        this.panelY = height;
        this.panelMinH = (height - this.panelH) / 2 - 30;
        this.panelChangeY = 8;
        // 奖牌
        this.modelImg = game.imgs.get('model_0');
        this.modelW = this.modelImg.width / 2;
        this.modelH = this.modelImg.height / 2;
        // 开始游戏按钮
        this.btnAlpha = 0;
        this.btnChangAlpha = 0;
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
      case 7:
        // 开始游戏按钮界面
        // 绘制游戏标题
        this.titleY >= this.titleH
          ? (this.titleY = this.titleH)
          : (this.titleY += this.titleChangeY); // 从上往下的动画
        ctx.drawImage(this.titleImg, this.titleX, this.titleY);
        // 绘制小鸟
        if (this.birdY > this.birdMaxH || this.birdY < this.birdMinH) {
          this.birdChangeY *= -1;
        }
        this.birdY += this.birdChangeY;
        ctx.drawImage(this.birdImg, this.birdX, this.birdY);
        // 绘制按钮
        this.btnY <= this.btnH
          ? ((this.btnY = this.btnH), this.enter(7))
          : (this.btnY -= this.btnChangeY);
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
        this.scoreRender();
        break;
      case 4:
        // 小鸟碰撞之后闪烁
        if (game.frame - this.initFrame > this.time) {
          // 闪烁之后自动进入场景 5
          this.enter(5);
        }
        pipes.forEach(pipe => pipe.render());
        this.scoreRender();
        ctx.save();
        this.birdAlpha -= this.birdChangeAlpha;
        if (
          this.birdAlpha < this.birdChangeAlpha + 0.01 ||
          this.birdAlpha > 1
        ) {
          // 这里不能变成 0, 变成 0 会出现闪烁
          this.birdChangeAlpha *= -1;
        }
        ctx.globalAlpha = this.birdAlpha;
        ctx.translate(this.birdX, this.birdY); // 移动旋转中心
        ctx.rotate((this.birdRotate * Math.PI) / 180);
        ctx.drawImage(this.birdImg, -this.birdW / 2, -this.birdH / 2);
        ctx.restore();
        break;
      case 5:
        // 小鸟碰撞之后, 斜向下掉落
        pipes.forEach(pipe => pipe.render());
        this.scoreRender();
        if (this.birdY >= this.birdMaxH) {
          this.enter(6);
        }
        this.birdY += this.birdChangeY;
        this.birdChangeY += 0.98;
        ctx.save();
        ctx.translate(this.birdX, this.birdY); // 移动旋转中心
        ctx.rotate((this.birdRotate * Math.PI) / 180);
        ctx.drawImage(this.birdImg, -this.birdW / 2, -this.birdH / 2);
        ctx.restore();
        break;
      case 6:
      case 8:
        // 游戏结束颁奖界面
        pipes.forEach(pipe => pipe.render());
        this.gameOverY >= this.gameOverH
          ? (this.gameOverY = this.gameOverH)
          : (this.gameOverY += this.gameOverChangeY); // 从上往下的动画
        this.panelY <= this.panelMinH
          ? ((this.panelY = this.panelMinH), (this.btnChangAlpha = 0.2))
          : (this.panelY -= this.panelChangeY); // 从下往上的动画
        ctx.drawImage(this.gameOverImg, this.gameOverX, this.gameOverY);
        ctx.drawImage(
          this.panelImg,
          this.panelX,
          this.panelY,
          this.panelW,
          this.panelH
        );
        ctx.drawImage(
          this.modelImg,
          this.panelX + 33,
          this.panelY + 54,
          this.modelW,
          this.modelH
        );
        // 分数
        ctx.save();
        ctx.fillStyle = '#666';
        ctx.font = '20px consolas';
        ctx.textAlign = 'center';
        ctx.fillText(
          game.score,
          this.panelX + this.panelW - 52,
          this.panelY + 62
        );
        ctx.fillText('0', this.panelX + this.panelW - 52, this.panelY + 116);
        ctx.restore();
        ctx.save();
        this.btnAlpha >= 1
          ? ((this.btnAlpha = 1), this.enter(8))
          : (this.btnAlpha += this.btnChangAlpha);
        ctx.globalAlpha = this.btnAlpha;
        ctx.drawImage(this.btnImg, this.btnX, this.btnY);
        ctx.restore();
        break;
    }
  }
  scoreRender() {
    let { game } = this;
    let score = this.game.score;
    let scoreStr = score.toString();
    let { width, height } = game.canvas;
    const numWidth = 30;
    const numHeight = (numWidth / 2) * 3;
    let x = (width - scoreStr.length * (numWidth + 2) + 2) / 2; // 水平坐标
    [...scoreStr].forEach((num, i) => {
      game.ctx.drawImage(
        game.imgs.get(`score_${num}`),
        x + i * (numWidth + 2),
        height / 6,
        numWidth,
        numHeight
      );
    });
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
          // 只要点击了, 游戏就会开始
          this.enter(3);
          break;
        case 3:
          // 点击屏幕, 小鸟向上飞
          game.bird && game.bird.fly();
          break;
        case 7:
          if (
            e.offsetX >= this.btnX + 8 &&
            e.offsetX <= this.btnX + 106 &&
            e.offsetY >= this.btnY + 5 &&
            e.offsetY <= this.btnY + 60
          ) {
            this.enter(2);
          }
          break;
        case 8:
          if (
            e.offsetX >= this.btnX + 8 &&
            e.offsetX <= this.btnX + 106 &&
            e.offsetY >= this.btnY + 5 &&
            e.offsetY <= this.btnY + 60
          ) {
            this.enter(3);
          }
          break;
      }
    };
  }
}
