import Phaser from "phaser";

export default class Dino extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "dino");

    scene.physics.add.existing(this);
    scene.add.existing(this);

    this.scene = scene;

    this.scene.anims.create({
      key: "dino_move",
      frames: this.scene.anims.generateFrameNumbers("dino", {
        start: 1,
        end: 4,
      }),
      frameRate: 20,
      repeat: -1,
    });
  }

  move() {
    this.play("dino_move");
  }

  die() {
    this.setFrame(5);
  }
}
