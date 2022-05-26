class Intro extends Phaser.Scene {
    constructor() {
      super("introScene");
    }
  
    create() {
      console.log('Inside intro');

      // added keycode
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      this.bg = this.add.sprite(0,0, 'cutsceneBG').setOrigin(0, 0);

      let texts = [
        this.add.text(10, game.config.height/2 - 150, "Hank has always been alone.", mediumConfig),
        this.add.text(10, game.config.height/2 - 100, "He spends all day playing games,", mediumConfig),
        this.add.text(10, game.config.height/2 - 50, "and wishing he could hang with the popular kids.", mediumConfig),
        this.add.text(10, game.config.height/2 + 0, "Yet he believes that before he can talk to them,", mediumConfig),
        this.add.text(10, game.config.height/2 + 50, "he needs to be like them", mediumConfig)
      ];

      for (let i = 0; i < texts.length; i++){
        texts[i].setAlpha(0);
        this.tweens.add({

          targets: texts[i],
          alpha: 1,
          duration: 500,
          delay: 2000 * i,

        });
      }

      // Create the green arrow, link it to next scene, and hide it before it's needed.
      this.nextArrow = this.add.sprite(50, 500, 'arrow').setAlpha(0).setScale(2);
      this.nextArrow.setInteractive({
          useHandCursor: true,
      });
      // click on a Game Object
      this.input.on('gameobjectdown', (pointer, gameObject, event) => {
          this.scene.start('cutScene');
      });

      this.tweens.add({

        targets: this.nextArrow,
        alpha: 1,
        duration: 500,
        delay: 10000,

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