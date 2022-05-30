class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
  
    create() {
      console.log('Inside Menu');

      // added keycode
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      this.bg = this.add.sprite(0,0, 'cutsceneBG').setOrigin(0, 0);

      this.add.text(game.config.width/2, game.config.height/2 - 100, "Quest for Cool", textConfig).setOrigin(0.5,0.5);
      this.add.text(game.config.width/2, game.config.height/2, "Press the green arrow to begin!", smallConfig).setOrigin(0.5,0.5);

      // Create the green arrow, link it to next scene, and hide it before it's needed.
      this.nextArrow = this.add.sprite(50, 500, 'arrow').setAlpha(1).setScale(2);
      this.nextArrow.setInteractive({
          useHandCursor: true,
      });
      this.restart = this.add.sprite(900, 30, 'restart').setAlpha(1).setScale(.5);
      this.restart.setInteractive({
          useHandCursor: true,
      });
      // click on a Game Object
      this.input.on('gameobjectdown', (pointer, gameObject, event) => {
          if (gameObject == this.nextArrow){
            this.scene.start('introScene');
          }
          if (gameObject == this.restart){
            cutsceneState = 'start';
            this.scene.start('menuScene');
          }
          
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