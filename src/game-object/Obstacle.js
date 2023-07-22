import Phaser from "phaser";

export default class Obstacle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = "obstacle-large", frame) {
    super(scene, x, y, texture, frame);

    this.scene = scene;
  }

  display(){
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)

    this.body.allowGravity = false;
    
  }
}
