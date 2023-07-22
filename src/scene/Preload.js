import Phaser from "phaser";
import WebFontFile from "../fonts/WebFontFile";
import config from "../config";

const {fontFamily} = config

export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.spritesheet("dino", "images/1x-trex.png", {
      frameWidth: 44,
      frameHeight: 47,
    });

    this.load.spritesheet("obstacle-large", "images/1x-obstacle-large.png", {
      frameWidth: 25,
      frameHeight: 50,
    });
    this.load.spritesheet("obstacle-small", "images/1x-obstacle-small.png", {
      frameWidth: 17,
      frameHeight: 35,
    });
    this.load.image("street", "images/1x-horizon.png");
    this.load.image("cloud", "images/1x-cloud.png");
    this.load.addFile(new WebFontFile(this.load, fontFamily));
  }

  create() {
    this.scene.start("game");
  }
}
