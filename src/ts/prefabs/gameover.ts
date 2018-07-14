import { GameObjects } from 'phaser'
import Board from './board'

export default class GameOver extends GameObjects.Container {
  private over: GameObjects.Image
  private board: FlappyBoard
  private restartBtn: GameObjects.Image

  constructor(scene, x, y) {
    // TODO: x, y表示container的中心点??
    super(scene, x, y)
    // this.setVisible(false)
  }
  
  private addDisplay(score) {
    let { scene } = this
    
    // this.setVisible(true)
    this.over = scene.add.image(0, -40, 'game_over')
    this.board = new Board(this.scene, 0, -20, score)
    this.restartBtn = scene.add.image(0, 0, 'btn')
    
    this.add(this.over)
    this.add(this.board)
    this.add(this.restartBtn)

    // set all transparent
    Phaser.Actions.SetAlpha(this.list, 0)

    scene.add.existing(this)
  }

  show(score) {
    this.addDisplay(score)

    // show game over
    let timeline = this.scene.tweens.createTimeline(null)
    timeline.add({
      targets: this.over,
      y: '-=110',
      alpha: 1.0,
      duration: 300
    })

    // show board
    timeline.add({
      targets: this.board,
      y: '+=20',
      alpha: 1.0,
      ease: 'Quad.easeIn',
      duration: 300,
      delay: 500,
      onStart() {
        this.scene.swooshingSound.play()
      },
      onStartScope: this
    })
    
    // score add
    if (score > 0) {
      timeline.add({
        targets: this.board.score,
        score: score,
        duration: 200
      })
    }
    // 最高分可能会动画哦

    // button
    timeline.add({
      targets: this.restartBtn,
      y: 90,
      alpha: 1.0,
      duration: 200,
      dealy: 200
    })

    timeline.play()
  
    timeline.once('complete', () => {
      let { restartBtn } = this
      // 按钮可以点击
      restartBtn.setInteractive()
      restartBtn.once('pointerdown', () => {
        restartBtn.disableInteractive()
        let scene = <FlappyGameScene>this.scene
        scene.restartGame()
      })
    })
  }
}