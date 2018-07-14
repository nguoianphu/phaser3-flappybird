import { GameObjects } from 'phaser'
import Score from './score'

export default class Board extends GameObjects.Container implements FlappyBoard {
  score: FlappyScore

  constructor(scene, x, y, score) {
    super(scene, x, y)

    let emptyBoard = scene.add.image(0, -30, 'board')
    this.score = new Score(scene, 90, -32, 'flappyfont', score.toString(), 18)
    let bestScore = new Score(scene, 90, 16, 'flappyfont', '100', 18)
    this.score.alignRightBottom()
    bestScore.alignRightBottom()

    
    this.add([emptyBoard, this.score, bestScore])
    
    let medalType = this.scoreToMedal(score)
    if (medalType) {
      let medal = scene.add.image(-65, -22, medalType).setScale(1.7)
      this.add(medal)
    }
    
    // 貌似该行不需要
    // scene.add.existing(this)
  }

  private scoreToMedal(score) {
    let medal = ''

    if (score > 0 && score < 2) {
      medal = 'bronze'
    } else if (score >= 2 && score < 5) {
      medal = 'silver'
    } else if (score >= 5) {
      medal = 'gold'
    }

    return medal
  }
}