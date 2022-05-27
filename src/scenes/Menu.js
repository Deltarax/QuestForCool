class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
  
    create() {
      console.log('Inside Menu');

      // added keycode
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      this.bg = this.add.sprite(0,0, 'cutsceneBG').setOrigin(0, 0);

      this.add.text(10, game.config.height/2 - 100, "Quest for Cool (tentative)", textConfig);
      this.add.text(10, game.config.height/2, "Press the green arrow to begin!", smallConfig);

      // Create the green arrow, link it to next scene, and hide it before it's needed.
      this.nextArrow = this.add.sprite(50, 500, 'arrow').setAlpha(1).setScale(2);
      this.nextArrow.setInteractive({
          useHandCursor: true,
      });
      // click on a Game Object
      this.input.on('gameobjectdown', (pointer, gameObject, event) => {
          this.scene.start('introScene');
      });

      this.tweens.add({

        targets: this.nextArrow,
        scale: 2.2,
        duration: 500,
        yoyo: true,
        repeat: -1

      });


    }
  }