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

    this.init();
  }
  init() {}
  clear() {
    let { width, height } = this.canvas;
    this.ctx.clearRect(0, 0, width, height);
  }
  start() {
    // 游戏的每一帧
    this.timer = setInterval(() => {}, 20);
  }
}
let game = new Game();
