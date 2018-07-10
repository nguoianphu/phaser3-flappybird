/// <reference path="./phaser.d.ts" />

// interface FlappyGame extends Phaser.Game {
//   birdSpeed: 125,
//   birdGravity?: number,
//   birdFlapPower?: number,
//   pipeDistance?: number[],
//   pipeHole?: number[]
// }

interface FlappyGameScene extends Phaser.Scene {
  scoreSound: Phaser.Sound.BaseSound
  gameOver(): void
  restartGame(): void
}

interface FlappyPipes extends Phaser.Physics.Arcade.Group {
  h: number
  farestChild:Phaser.GameObjects.Sprite
  genPipes(h: number): void
  genOnePipe(x: number): void
  handlePipeOut(pipe: Phaser.GameObjects.Sprite, frameNum: number): void
  stop(): void
}

interface FlappyPipe extends Phaser.GameObjects.Sprite {
  stop(): void
}

interface FlappyBoard extends Phaser.GameObjects.Container {
  score: FlappyScore
}

interface FlappyScore extends Phaser.GameObjects.BitmapText {
  score: number
  addScore(): void
  show(): void
  hide(): void
  alignRightBottom(): void
}

interface FlappyBird extends Phaser.Physics.Arcade.Sprite {
  updateBird(scene: Phaser.Scene): void
  jump(): void
  setG(): void
  headDroop(): void
  stopTween(): void
}

interface FlappyGround extends Phaser.GameObjects.TileSprite {
  updateGround(delta: number): void
}