class Game {
  constructor() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    // 挂载必要属性
    this.canvas = canvas;
    this.ctx = ctx;
    this.imgs = new Map([
      ['bg_day', '../imgs/bg_day.png'],
      ['bird2_0', '../imgs/bird2_0.png'],
      ['bird2_1', '../imgs/bird2_1.png'],
      ['bird2_2', '../imgs/bird2_2.png'],
      ['button_play', '../imgs/button_play.png'],
      ['ground', '../imgs/ground.png'],
      ['pipe_up', '../imgs/pipe_up.png'],
      ['pipe_down', '../imgs/pipe_down.png'],
      ['pipe', '../imgs/pipe.png'],
      ['tap', '../imgs/tap.png'],
      ['text_game_over', '../imgs/text_game_over.png'],
      ['title', '../imgs/title.png'],
      ['scene_1', '../imgs/scene_1.jpg'],
      ['scene_2', '../imgs/scene_2.jpg'],
      // ['scene_3', '../imgs/scene_3.jpg'],
      ['scene_4', '../imgs/scene_4.jpg']
    ]);

    // 主定时器
    this.timer = null;
    // 移动速度
    this.speed = 1;

    this.init();
  }
  init() {
    this.loadImg();
  }
  clear() {
    let { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
  }
  start() {
    this.clear();
    this.bg = new Background(this);
    this.land = new Land(this);
    // 游戏的每一帧
    this.timer = setInterval(() => {
      this.clear();
      this.bg.update(this.speed); // 背景更新
      this.land.update(this.speed); // 地面的更新
    }, 20);
  }
  loadImg() {
    let count = 0;
    let total = this.imgs.size;
    let { ctx, canvas } = this;
    let { width, height } = canvas;
    let pw = width - 60; // 进度条宽度
    let ph = 30; // 进度条高度
    let process = new Process(ctx, 30, height / 3, pw, ph);
    this.imgs.forEach((src, key) => {
      let img = new Image();
      img.src = src;
      img.onload = () => {
        this.imgs.set(key, img);
        process.update((pw / total) * ++count);
        // 如果全部加载完成, 则开始游戏
        if (count === total) {
          // 一定延时之后, 开启游戏
          setTimeout(() => {
            this.start();
          }, 200);
        }
      };
    });
  }
}
let game = new Game();
