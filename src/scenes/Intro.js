class Intro extends Phaser.Scene {
    constructor() {
      super("introScene");
    }
  
    create() {
      console.log('Inside intro');

      // added keycode
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      this.bg = this.add.sprite(0,0, 'cutsceneBG').setOrigin(0, 0);

      this.add.text(10, game.config.height/2 - 200, "Johnson has always been alone", mediumConfig);
      this.add.text(10, game.config.height/2 - 100, "he spends all day playing games", mediumConfig);
      this.add.text(10, game.config.height/2, "and wishing he could hang with the popular kids", mediumConfig);
      this.add.text(10, game.config.height/2 + 100, "but before he can talk to them, he needs to be like them", mediumConfig);

      // Create the green arrow, link it to next scene, and hide it before it's needed.
      this.nextArrow = this.add.sprite(50, 500, 'arrow').setAlpha(1).setScale(2);
      this.nextArrow.setInteractive({
          useHandCursor: true,
      });
      // click on a Game Object
      this.input.on('gameobjectdown', (pointer, gameObject, event) => {
          this.scene.start('cutScene');
      });


    }
}