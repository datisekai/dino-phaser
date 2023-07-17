import Phaser from "phaser";
import Dino from "../game-object/Dino";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  create() {
    this.dino = new Dino(this, 50, 50);
    this.isGameOver = false;

    this.obstacleGroup = this.physics.add.group();

    this.street = this.add.tileSprite(300, 200, 600, 150, "street");

    this.physics.add.existing(this.street);

    this.street.body.allowGravity = false;
    this.street.body.immovable = true;

    this.physics.add.collider(this.street, this.dino);

    this.cursor = this.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "dino_move",
      frames: this.anims.generateFrameNumbers("dino", { start: 1, end: 4 }),
      frameRate: 20,
      repeat: -1,
    });

    this.dino.play("dino_move");

    setInterval(() => {
      if (!this.isGameOver) {
        this.score++;
        this.scoreLabel.setText(this.score);
      }
    }, 100);

    this.createObstacle();

    this.physics.add.collider(this.dino, this.obstacleGroup, () => {
      this.scene.pause();
      this.isGameOver = true;
    });

    this.score = 0;
    this.scoreLabel = this.add.text(20, 0, this.score, {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      color: "#0000000",
    });
  }

  createObstacle() {
    let x = 700;
    for (let i = 0; i < 3; i++) {
      const obstacle = this.physics.add.sprite(
        x,
        120,
        "obstacle-large",
        Phaser.Math.Between(0, 5)
      );
      x -= Phaser.Math.Between(300, 400);
      this.obstacleGroup.add(obstacle);
      obstacle.body.allowGravity = false;
      obstacle.body.immovable = true;
    }
  }

  update() {
    this.obstacleGroup.getChildren().forEach((item) => {
      item.x -= 5;
    });

    this.obstacleGroup.getChildren().forEach((item) => {
      if (item.x <= 0) {
        item.destroy();
        const obstacle = this.physics.add.sprite(
          600,
          120,
          "obstacle-large",
          Phaser.Math.Between(0, 5)
        );
        this.obstacleGroup.add(obstacle);
        obstacle.body.allowGravity = false;
        obstacle.body.immovable = true;
      }
    });

    this.street.tilePositionX += 5;

    if (this.cursor.space.isDown) {
      this.dino.setVelocityY(-250);
    }
  }
}
