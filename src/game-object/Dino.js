import Phaser from "phaser";

export default class Dino extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "dino");

    scene.physics.add.existing(this)
    scene.add.existing(this);

    this.scene = scene;


  }

}
