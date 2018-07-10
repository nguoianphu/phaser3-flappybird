import { GameObjects, Physics } from 'phaser'

export default class Pipe extends GameObjects.Sprite implements FlappyPipe {
  pipes: FlappyPipes
  bird: Physics.Arcade.Sprite
  score: FlappyScore
  frameNum: number
  addedScore: boolean
  
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame)
    
    this.pipes = scene.pipes
    this.bird = scene.bird
    // 初始设置所以前面都要有
    this.score = scene.labelScore
    this.frameNum = frame
    if (frame === 0) {
      this.addedScore = false
    }
  }

  preUpdate() {
    // 单个pipe图片的宽度为54
    if (this.x < -54) {
      this.pipes.handlePipeOut(this, this.frameNum)
      this.addedScore = false
    }

    if (!this.addedScore && this.frameNum === 0 && this.x + 28 + 17 < this.bird.x) {
      this.score.addScore()
      this.addedScore = true
    }
  }

  public setSpeed() {
    let pipeBody = <Phaser.Physics.Arcade.Body>this.body
    pipeBody.setVelocityX(-100)
  }

  public stop() {
    let pipeBody = <Phaser.Physics.Arcade.Body>this.body
    pipeBody.setVelocityX(0)
    this.setActive(false)
  }
}