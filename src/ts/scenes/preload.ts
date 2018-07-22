import { Scene } from 'phaser'

export default class PreloadScene extends Scene {
  constructor() {
    super({ key: 'Preload' })
  }

  init() {
    let config = this.sys.game.config
    let width = <number>config.width
    let height = <number>config.height
    let loadingPic = this.add.image(width / 2, height / 2, 'loading')
    
    loadingPic.setSize(0, 19)
    this.load.on('progress', (value) => {
      // loadingPic.frame.setSize(value * 220, 19)
      // phaser 3.11 frame没有setSize方法
      loadingPic.setSize(value * 220, 19)
    })
  }

  preload() {
    let image = this.load.image.bind(this.load)
    let spritesheet = this.load.spritesheet.bind(this.load)
    let audio = this.load.audio.bind(this.load)

    // Images
    this.load.setPath('assets/images/')
    // 背景图
    image('background', 'background.png')
    // 地面
    image('ground', 'ground.png')
    // 游戏标题
    image('title', 'title.png')
    // 开始按钮
    image('btn', 'start-button.png')
    // 玩法提示
    image('play_tip', 'instructions.png')
    // get ready图片
    image('ready_text', 'get-ready.png')
    // game over 图片
    image('game_over', 'gameover.png')
    // 分数面板
    image('board', 'scoreboard.png')
    // 金牌, 银牌, 铜牌
    image('gold', 'gold.png')
    image('silver', 'silver.png')
    image('bronze', 'bronze.png')

    // 小鸟
    spritesheet('bird', 'bird.png', { frameWidth: 34, frameHeight: 24, endFrame: 2 })
    // 管道
    spritesheet('pipe', 'pipes.png', { frameWidth: 54, frameHeight: 320, endFrame: 1})

    // Fonts
    this.load.setPath('assets/fonts/')
    this.load.bitmapFont('flappyfont', 'flappyfont.png', 'flappyfont.xml')

    // Audio
    this.load.setPath('assets/audio/')
    audio('fly_sound', 'flap.wav')
    audio('score_sound', 'score.wav')
    audio('hit_pipe_sound', 'pipehit.wav')
    audio('hit_ground_sound', 'ouch.wav')
    audio('swooshing', 'swooshing.wav')
  }

  create() {
    // 到menu中的preload打印this.load发现_eventsCount: 0, 所以这里不用销毁
    // this.load.destroy()
    // All resource loaded
    this.scene.start('Menu')
  }
}
