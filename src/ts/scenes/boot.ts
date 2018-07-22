import { Scene } from 'phaser'

export default class BootScene extends Scene {
  constructor() {
    super({ key: 'Boot' })
  }
  
  preload() {
    // 220 x 19 实际内容 208 x 12
    this.load.image('loading', 'assets/images/preloader.gif')
  }

  create() {
    this.scene.start('Preload')
  }
}
