import { GameObjects  } from 'phaser'

const round = Math.round

export default class Score extends GameObjects.BitmapText implements FlappyScore {
  _score: number = 0
  
  // text必须传进来的，当然可以为undefined.
  constructor(scene, x, y, font, text, size) {
    super(scene, x, y, font, text, size)
    
    this._score = 0
  }

  alignRightBottom() {
    this.setOrigin(1, 1)
  }
  
  get score() {
    return this._score
  }

  set score(score) {
    this._score = round(score)
    this.setText(this._score.toString())
  }

  addScore() {
    let scene = <FlappyGameScene>this.scene
    this.score += 1
    scene.scoreSound.play()
  }

  show() {
    this.setVisible(true)
  }

  hide() {
    this.setVisible(false)
  }
}