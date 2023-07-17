import Phaser from "phaser";
import Preload from "./scene/Preload";
import Game from "./scene/Game";

const config = {
  type: Phaser.AUTO,
  parent: "app",
  width: 600,
  height: 150,
  backgroundColor: "#F7F7F7",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
    },
  },
  scene: [Preload, Game],
};

export default new Phaser.Game(config);
