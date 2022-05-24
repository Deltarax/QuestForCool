class Hurdle extends Phaser.Scene {
  constructor() {
    super("hurdleScene");
  }

  create() {
    this.hurdleSprite = this.add.sprite(250, 250, 'hurdleMC').setOrigin(0, 0);
    this.hurdle = this.add.sprite(0, 0, 'hurdle').setOrigin(0, 0);
    this.hurdleBG = this.add.tileSprite(0, 0, 960, 540, 'hurdleBG').setOrigin(0, 0);

    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.score = 0;

    this.nextArrow = this.add.sprite(50, 500, 'arrow').setAlpha(0).setScale(2);
    this.nextArrow.setInteractive({
        useHandCursor: true,
    });
        // click on a Game Object
    this.input.on('gameobjectdown', (pointer, gameObject, event) => {
        cutsceneState = 'end';
        this.scene.start('cutScene');
    });
  }

  update() {
    this.hurdleBG.tilePositionX -= 3;
    if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
      if (this.hurdleSprite.positionY != 900) {
        this.hurdleSprite.positionY += 20;
      } else {
        this.hurdleSprite.positionY -= 20;
      };
    }
  }
}