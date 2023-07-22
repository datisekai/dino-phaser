import Phaser from "phaser";
import config from "../config";

const { fontFamily } = config;

export default class Button extends Phaser.GameObjects.Rectangle {
  constructor(
    scene,
    x,
    y,
    width,
    height,
    text,
    backgroundColor = 0xfb9057,
    borderColor = 0xf75c1e
  ) {
    super(scene, x, y, width, height, backgroundColor);

    this.scene = scene;

    scene.add.existing(this);

    this.text = text;

    this.setInteractive({ useHandCursor: true });
    this.setStrokeStyle(4, borderColor);

    this.createText();

    this.setDepth = 1;
  }

  createText() {
    this.scene.add
      .text(this.x, this.y, this.text, {
        fontFamily: fontFamily,
        fontSize: "30px",
        color: "#ffffff",
      })
      .setOrigin(0.5);
  }
}
