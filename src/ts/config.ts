export const gameConfig = {
  type: Phaser.AUTO,
  parent: 'flappy-container',
  width: 320,
  height: 505,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  banner: false
}

export const config = {
  birdGravity: 800,
  birdFlapPower: 300,
  // 左右两个管道出现的间距区间
  pipeDistance: [150, 180],
  // 上下管道之间的间距区间
  pipeHole: [100, 130]
}