import Phaser from "phaser";
import Preload from "./scene/Preload";
import Game from "./scene/Game";
import Bootstrap from "./scene/Bootstrap";
import configDefault from "./config";
import GameOver from "./scene/GameOver";

const { width, height, backgroundColor, gravityY } = configDefault;

const config = {
  type: Phaser.AUTO,
  parent: "app",
  width,
  height,
  backgroundColor,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: gravityY },
    },
  },
  scene: [Preload, Game, Bootstrap, GameOver],
};

export default new Phaser.Game(config);
