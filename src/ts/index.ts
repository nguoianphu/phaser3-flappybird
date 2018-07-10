/// <reference path="../../types/interfaces.d.ts" />
import '../scss/index.scss'

import { Game } from 'phaser'
import BootScene from './scenes/boot'
import PreloadScene from './scenes/preload'
import MenuScene from './scenes/menu'
import GameScene from './scenes/game'
import { gameConfig } from './config'

class App {
  constructor() {
    let game = new Game(gameConfig)
    game.scene.add('Boot', BootScene, true)
    game.scene.add('Preload', PreloadScene)
    game.scene.add('Menu', MenuScene)
    game.scene.add('Game', GameScene)
  }
}
  
new App()