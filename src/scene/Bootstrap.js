import Phaser from "phaser";
import Button from "../game-object/Button";
import config from "../config";

const { width, height } = config;

export default class Bootstrap extends Phaser.Scene {
  constructor() {
    super("bootstrap");
  }

  create() {
    this.background = this.add.rectangle(
      650 / 2,
      150 / 2,
      650,
      150,
      0x000000,
      0.6
    );

    this.play = new Button(this, width / 2, height / 2, 150, 60, "Play", 0x000000, 0xffffff);

    this.input.on('gameobjectdown',(pointer, gameobject) => {
        switch(gameobject){
            case this.play:
                this.scene.stop()
                this.scene.get('game').isGameOver = false;
                this.scene.get('game').dino.move();
                break;
        }
    })
  }
}
