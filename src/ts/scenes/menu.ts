import { Scene, GameObjects } from 'phaser'

export default class MenuScene extends Scene {
  background: GameObjects.TileSprite
  ground: GameObjects.TileSprite
  iter: number = 0
  bird: GameObjects.Sprite
  
  constructor() {
    super({ key: 'Menu' }) 
  }

  create() {
    let config = this.sys.game.config
    let width = <number>config.width
    let height = <number>config.height
    
    this.background = this.add.tileSprite(width / 2, height / 2, width, height, 'background')
    this.ground = this.add.tileSprite(width / 2, height - 56, width, 112, 'ground')
    
    // TODO: 这边是否考虑用container效果更好?
    let titleGroup = this.add.group()
    let title = titleGroup.create(145, 100, 'title')
    this.bird = titleGroup.create(257, 100, 'bird')
    
    // 这个好像不会因为切换Scene而消失
    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    })
    
    this.bird.anims.play('fly')

    this.tweens.add({
      targets: titleGroup.getChildren(),
      y: '+=20',
      duration: 1000,
      yoyo: true,
      repeat: Number.MAX_VALUE
    })

    let btn = this.add.image(width / 2, height / 2, 'btn')
    btn.setInteractive()
    btn.once('pointerdown', () => {
      // btn.disableInteractive()
      btn.removeInteractive()
      this.scene.start('Game')
    })
  }
  
  update(time, delta) {
    this.background.tilePositionX -= 10 * delta / 1000
    this.ground.tilePositionX -= 100 * delta / 1000    
  }
}