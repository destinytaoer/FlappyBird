class Game {
  constructor() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    // 挂载必要属性
    this.canvas = canvas;
    this.ctx = ctx;
    this.imgs = new Map([
      ['bg_day', './imgs/bg_day.png'],
      ['bird2_0', './imgs/bird2_0.png'],
      ['bird2_1', './imgs/bird2_1.png'],
      ['bird2_2', './imgs/bird2_2.png'],
      ['button_play', './imgs/button_play.png'],
      ['ground', './imgs/ground.png'],
      ['pipe_up', './imgs/pipe_up.png'],
      ['pipe_down', './imgs/pipe_down.png'],
      ['pipe', './imgs/pipe.png'],
      ['tap', './imgs/tap.png'],
      ['text_game_over', './imgs/text_game_over.png'],
      ['title', './imgs/title.png'],
      ['scene_1', './imgs/scene_1.jpg'],
      ['scene_2', './imgs/scene_2.jpg'],
      // ['scene_3', './imgs/scene_3.jpg'],
      ['scene_4', './imgs/scene_4.jpg'],
      ['score_0', './imgs/score_0.png'],
      ['score_1', './imgs/score_1.png'],
      ['score_2', './imgs/score_2.png'],
      ['score_3', './imgs/score_3.png'],
      ['score_4', './imgs/score_4.png'],
      ['score_5', './imgs/score_5.png'],
      ['score_6', './imgs/score_6.png'],
      ['score_7', './imgs/score_7.png'],
      ['score_8', './imgs/score_8.png'],
      ['score_9', './imgs/score_9.png']
    ]);
    this.sceneNo = 1; // 记录当前的场景编号, 初始是第一个场景

    // 主定时器
    this.timer = null;
    // 移动速度, 初始移动速度为 0
    this.speed = 0;
    // 记录管子出现前的帧数
    this.frame = 0;
    // 管子出现的帧数, 通过帧数来控制管道出现的间隔
    this.pipeSpeed = 250;

    this.score = 0; // 记录分数

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
    this.sm = new SceneManager(this);
    this.sm.enter(1);
    // 游戏的每一帧
    this.timer = setInterval(() => {
      this.clear();
      this.sm.update();
      this.frame++;
    }, 20);
  }
  stop() {
    clearInterval(this.timer);
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
