import { Physics, GameObjects } from 'phaser'
import Pipe from './pipe'

export default class Pipes extends Physics.Arcade.Group implements FlappyPipes {
  h: number
  farestChild: GameObjects.Sprite
  _count: number = 0

  constructor(world, scene, config) {
    super(world, scene, config)
  }

  genPipes(h) {
    this.h = h
    let num = 4
    let startPos = 300
    this.genOnePipe(startPos)
    this.genOnePipe(startPos + 150)
    this.genOnePipe(startPos + 300)
    this.genOnePipe(startPos + 450)
    // this.time.addEvent({ delay: 1500, callback: this.sayHello, callbackScope: this, loop: true });
    let lastChild = <GameObjects.Sprite>this.getChildren()[num * 2 - 1]
    
    this.setFarestChild(lastChild)
  }

  genOnePipe(x) {
    // 上下柱子的间隙距离
    let gap: number = 100
    
    let h = this.h
    // 为了让管道口显示出来最小留白的高度, 上下对称
    let m = 25
    let pos = Phaser.Math.Between(m,  h - 112 - m - gap)
    let topY = pos - 160
    let bottomY = pos + gap + 160

    let topPipe = new Pipe(this.scene, x, topY, 'pipe', 0)
    let bottomPipe = new Pipe(this.scene, x, bottomY, 'pipe', 1)

    this.add(topPipe, true)
    this.add(bottomPipe, true)
    topPipe.setSpeed()
    bottomPipe.setSpeed()

    // 其实也也可以监听
  }

  // 上下管道都会调用
  handlePipeOut(pipe, frameNum) {
    let topY
    let bottomY
    this._count++
    pipe.setX(this.farestChild.x + 200)
    
    // 设置不同的y
    if (frameNum === 0) {
      // topY
    } else if (frameNum === 1) {
      // bottomY
    }
    if (this._count == 2) {
      this.setFarestChild(pipe)
      this._count = 0
    }
  }

  setFarestChild(child) {
    this.farestChild = child
  }

  stop() {
    Phaser.Actions.Call(this.getChildren(), (item: FlappyPipe) => item.stop(), this)
    // Phaser.Utils.Array.SetAll(this.getChildren(), 'body.velocity.x', 0)
  }
}