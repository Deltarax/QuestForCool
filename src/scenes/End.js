class End extends Phaser.Scene {
    constructor() {
      super("endScene");
    }
  
    create() {
      console.log('Inside end');

      // added keycode
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      this.bg = this.add.sprite(0,0, 'cutsceneBG').setOrigin(0, 0);

      
      let texts = [
        this.add.text(game.config.width/2, game.config.height/2 - 150, "As they talked about games he realized,", mediumConfig).setOrigin(0.5,0.5),
        this.add.text(game.config.width/2, game.config.height/2 - 100, "instead of trying to mold himself out of fear,", mediumConfig).setOrigin(0.5,0.5),
        this.add.text(game.config.width/2, game.config.height/2 - 50, "he just needed to introduce himself,", mediumConfig).setOrigin(0.5,0.5),
        this.add.text(game.config.width/2, game.config.height/2 + 0, "to become friends with them!", mediumConfig).setOrigin(0.5,0.5),
        this.add.text(game.config.width/2, game.config.height/2 + 50, "END", mediumConfig).setOrigin(0.5,0.5)
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
          this.scene.start('creditScene');
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