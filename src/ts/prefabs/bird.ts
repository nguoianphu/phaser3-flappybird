import { Physics } from 'phaser'
import { config } from '../config'

export default class Bird extends Physics.Arcade.Sprite implements FlappyBird {
  // 不能使用game属性哦
  private flySound: Phaser.Sound.BaseSound
  private tween: Phaser.Tweens.Tween

  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)
    
    // TODO: 为什么不太容易动态修改setOrigin??

    // 添加小鸟飞翔的声音
    this.flySound = scene.sound.add('fly_sound')
    this.setDepth(1)
  }
  
  // 注意: 并不是内置的方法
  updateBird(scene) {
    // 撞到柱子
    if (this.active === false) return
    
    if (this.y > 180) {
      this.angle += 1
    }
    
    // this.y < 0 || this.y > 490
    if (this.y < 0) {
      scene.hitPipe()
    }
  }
  
  jump() {
    let { birdFlapPower } = config
    
    // 向上飞
    let flapPower = 0 - birdFlapPower
    this.setVelocityY(flapPower)
    
    // 旋转
    if (this.angle > -20) {
      this.stopTween()
      this.tween = this.scene.tweens.add({
        targets: this,
        angle: '-= 20',
        duration: 100
      })
    }

    // 播放声音
    this.flySound.play()
  }

  headDroop() {
    this.stopTween()
    this.tween = this.scene.tweens.add({
      targets: this,
      duration: 500,
      angle: 70
    })
  }

  stopTween() {
    if (this.tween) {
      this.tween.stop()
      this.tween = null
    }
  }

  setG() {
    let { birdGravity } = config
    this.body.setGravityY(birdGravity)
  }
}