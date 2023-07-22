import Phaser from "phaser";
import Dino from "../game-object/Dino";
import Obstacle from "../game-object/Obstacle";
import config from "../config";

const { width, height, fontFamily } = config;

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  create() {
    this.obstacleKeys = ["obstacle-small"];
    this.dino = new Dino(this, 100, 50);
    this.isGameOver = true;

    this.speed = this.targetSpeed = 4;

    this.obstacleGroup = this.physics.add.group();

    this.street = this.add.tileSprite(0, 120, 1200, 12, "street");

    this.physics.add.existing(this.street);

    this.street.body.allowGravity = false;
    this.street.body.immovable = true;

    this.physics.add.collider(this.street, this.dino);

    this.scene.launch("bootstrap");

    this.cursor = this.input.keyboard.createCursorKeys();

    this.input.on("pointerdown", () => {
      if (this.dino.body.touching.down) {
        this.dino.setVelocityY(-380);
      }
    });

    setInterval(() => {
      if (!this.isGameOver) {
        this.score++;
        this.scoreLabel.setText(this.score);

        //Tăng độ khó cho game
        if (this.score % 200 === 0) {
          this.targetSpeed++;
          this.obstacleKeys.push("obstacle-large");
        }

        if (this.score % 300 == 0) {
          this.createObstacle();
        }
      }
    }, 100);

    this.createObstacle();

    this.physics.add.collider(this.obstacleGroup, this.dino, () => {
      console.log("collider");
      this.scene.pause();
      this.isGameOver = true;
      this.scene.launch("game-over");
    });

    this.score = 0;
    this.scoreLabel = this.add.text(20, 0, this.score, {
      fontFamily: fontFamily,
      color: "#0000000",
    });
  }

  createObstacle(type = "") {
    let frame = type ? Phaser.Math.Between(0, 5) : 0;

    let x = type ? width + 100 : width - 100;

    const obstacleKey =
      this.obstacleKeys[Phaser.Math.Between(0, this.obstacleKeys.length - 1)];
    const obstacle = new Obstacle(this, x, height - 50, obstacleKey, frame);
    this.obstacleGroup.add(obstacle);
    obstacle.display();
  }

  update() {
    if (!this.isGameOver) {
      this.street.tilePositionX += this.speed;

      if (this.speed < this.targetSpeed) {
        this.speed += 0.05;
      }

      this.obstacleGroup.getChildren().forEach((item) => {
        item.x -= this.speed;
        if (item.x < 0) {
          item.destroy();

          this.createObstacle("random");
        }
      });

      if (this.cursor.space.isDown && this.dino.body.touching.down) {
        this.dino.setVelocityY(-380);
      }
    }
  }
}
