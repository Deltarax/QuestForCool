class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
  
    create() {
      // added keycode
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      this.bg = this.add.sprite(0,0, 'cutsceneBG').setOrigin(0, 0);

      // title
      this.add.text(game.config.width/2, game.config.height/2 - 100, "Quest for Cool", textConfig).setOrigin(0.5,0.5);
      this.add.text(game.config.width/2, game.config.height/2, "Press the green arrow to begin!", smallConfig).setOrigin(0.5,0.5);

      // Create the green arrow, link it to next scene, and hide it before it's needed.
      this.nextArrow = this.add.sprite(50, 500, 'arrow').setAlpha(1).setScale(2);
      this.nextArrow.setInteractive({
          useHandCursor: true,
      });

      // BGM
      this.BGM = this.sound.add('cutsceneBGM', {volume: 0.1});
      this.BGM.setLoop(true);
      this.BGM.play();

      // click on a Game Object
      this.input.on('gameobjectdown', (pointer, gameObject, event) => {
          if (gameObject == this.nextArrow){
            this.nextArrow.destroy();
            this.cameras.main.fadeOut(500, 255, 255, 255);
            this.BGM.stop();
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
              this.scene.start('introScene');
            })
          }
      });

      // make the arrow 'blink'
      this.tweens.add({

        targets: this.nextArrow,
        scale: 2.2,
        duration: 500,
        yoyo: true,
        repeat: -1

      });


    }
  }