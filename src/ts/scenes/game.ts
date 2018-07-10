import { Scene, GameObjects, Physics } from 'phaser'
import { config } from '../config'
import Pipes from '../prefabs/pipes'
import Score from '../prefabs/score'
import Ground from '../prefabs/groud'
import Bird from '../prefabs/bird'
import GameOver from '../prefabs/gameover'

// FIXME: 为什么感觉每次chrome tab切换后, 再回来声音很大?
export default class GameScene extends Scene implements FlappyGameScene {
  // GameObjects
  private background: GameObjects.TileSprite
  private readyTextImg: GameObjects.Image
  private playTipImg: GameObjects.Image
  // Interface
  private ground: FlappyGround
  private bird: FlappyBird
  private pipes: FlappyPipes
  private labelScore: FlappyScore
  // Variables
  private started: boolean = false
  private width: number
  private height: number
  private halfWidth: number
  private halfHeight: number

  scoreSound: Phaser.Sound.BaseSound
  swooshingSound: Phaser.Sound.BaseSound
  private hitPipeSound: Phaser.Sound.BaseSound
  private hitGroudSound: Phaser.Sound.BaseSound

  constructor() {
    super({ key: 'Game' })
  }

  init() {
    let config = this.sys.game.config
    this.width = <number>config.width
    this.height = <number>config.height
    this.halfWidth = this.width / 2
    this.halfHeight = this.height / 2
  }
  
  create() {
    let { width, height, halfWidth, halfHeight } = this
    
    this.background = this.add.tileSprite(halfWidth, halfHeight, width, height, 'background')
    this.ground = new Ground(this, halfWidth, height - 56, width, 112, 'ground')
    // FIXME: 为什么地面不加重力也能碰撞?
    // this.physics.add.existing(this.ground, true)
    this.add.existing(this.ground)
    
    // 添加文字和提示
    this.readyTextImg = this.add.image(halfWidth, 40, 'ready_text')
    this.playTipImg = this.add.image(halfWidth, 300, 'play_tip')

    // 鸟
    this.bird = new Bird(this, 50, 150, 'bird')
    this.physics.add.existing(this.bird, false)
    this.add.existing(this.bird)
    this.bird.anims.play('fly')
    
    // 虽然游戏还未开始，先添加了吧。。。虽然说不玩游戏就白加载了
    // 添加声音
    this.scoreSound = this.sound.add('score_sound')
    this.swooshingSound = this.sound.add('swooshing')
    this.hitPipeSound = this.sound.add('hit_pipe_sound')
    this.hitGroudSound = this.sound.add('hit_ground_sound')

    this.input.once('pointerdown', this.startGame, this)
  }
  
  restartGame() {
    this.scene.restart()
  }
  
  startGame() {
    // 销毁一些对象
    this.readyTextImg.destroy()
    this.playTipImg.destroy()
    
    // 为小鸟添加事件
    this.input.keyboard.on('keydown_SPACE', this.bird.jump, this.bird)

    // 为小鸟添加重力
    // let birdBody = <Phaser.Physics.Arcade.Body>this.body
    this.bird.setG()
    
    // 添加分数
    this.labelScore = new Score(this, 20, 20, 'flappyfont', '0', 36)
    // this.labelScore = new Score(this, 20, 20, '0', {
    //   font: '30px Arail',
    //   fill: '#ffffff'
    // })
    this.add.existing(this.labelScore)

    // 添加管道
    this.pipes = new Pipes(this.physics.world, this.physics.world.scene, { allowGravity: false })
    this.pipes.genPipes(this.height)

    // 为地面添加body
    this.physics.add.existing(this.ground, true)

    // collider
    this.physics.add.collider(this.bird, this.ground, this.hitGroud, null, this)
    this.physics.add.overlap(this.bird, this.pipes, this.hitPipe, null, this)
    

    this.started = true
  }

  update(time, delta) {
    if (!this.started) return

    if (this.background.active) {
      this.background.tilePositionX -= 10 * delta / 1000
    }
    
    if (this.ground.active) {
      this.ground.updateGround(delta)
    }

    if (this.bird.active) {
      this.bird.updateBird(this)
    }
  }
  
  // 由于bird.disableBody仅执行一次
  private hitGroud() {
    if (!this.started) return

    this.hitGroudSound.play()

    if (this.bird.active) {
      this.offBirdJump()
      this.stopGameObjects()
    }
    
    this.gameOver()
  }

  // 坠落再结束游戏
  hitPipe() {
    if (!this.bird.active) return

    this.hitPipeSound.play()
    this.offBirdJump()
    this.stopGameObjects()

    this.bird.headDroop()
  }

  private stopGameObjects() {
    this.background.setActive(false)
    this.ground.setActive(false)
    this.pipes.stop()
    this.bird.setActive(false)
  }

  // 解除鸟的飞翔绑定，这样也不用在bird的jump中判断了
  private offBirdJump() {
    this.input.keyboard.off('keydown_SPACE', this.bird.jump, this.bird, false)
  }
  
  gameOver() {
    if (!this.started) return
    // gameover
    this.started = false

    // TODO: 此方法debug外的框没去掉
    // this.bird.disableBody(true)
    // 让鸟的嘴插入土里。。。有点hack
    setTimeout(() => {
      this.physics.world.disableBody(this.bird.body)
      this.pipes.getChildren().forEach((child) => {
        let childObj = <Physics.Arcade.Sprite>child
        this.physics.world.disableBody(childObj.body)
      })
    }, 0)
    // 貌似disable不行...还是注意看下文档disable和disableBody
    // this.physics.world.disable([ this.bird, this.ground ])

    // 落地后还在旋转头，有点怪怪的
    this.bird.stopTween()

    this.showGameOver()
  }

  private showGameOver() {
    let gameOver = new GameOver(this, this.halfWidth, this.halfHeight)
    gameOver.show(this.labelScore.score)
  }
}
