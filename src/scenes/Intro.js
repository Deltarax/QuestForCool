class Intro extends Phaser.Scene {
    constructor() {
      super("introScene");
    }
  
    create() {
      // camera fade in
      this.cameras.main.fadeIn(500, 255, 255, 255);

      // added keycode
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      this.bg = this.add.sprite(0,0, 'textBG').setOrigin(0, 0);

      // Intro texts
      let texts = [
        this.add.text(game.config.width/2, game.config.height/2 - 150, "Hank has always been alone.", mediumConfig).setOrigin(0.5,0.5),
        this.add.text(game.config.width/2, game.config.height/2 - 100, "He spends all day playing games,", mediumConfig).setOrigin(0.5,0.5),
        this.add.text(game.config.width/2, game.config.height/2 - 50, "and wishing he could hang with the popular kids.", mediumConfig).setOrigin(0.5,0.5),
        this.add.text(game.config.width/2, game.config.height/2 + 0, "Yet he believes that before he can talk to them,", mediumConfig).setOrigin(0.5,0.5),
        this.add.text(game.config.width/2, game.config.height/2 + 50, "he needs to be like them.", mediumConfig).setOrigin(0.5,0.5)
      ];

      // Slowly display each line of text with a delay
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
          if (gameObject == this.nextArrow){
            this.nextArrow.destroy();
            // camera fade out
            this.cameras.main.fadeOut(500, 255, 255, 255);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
              cutsceneState = 'start';
              this.scene.start('cutScene');
            })
          }
      });

      // Show and blink the arrow after a delay
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