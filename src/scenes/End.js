class End extends Phaser.Scene {
    constructor() {
      super("endScene");
    }
  
    create() {
      console.log('Inside end');

      // added keycode
      keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      this.bg = this.add.sprite(0,0, 'cutsceneBG').setOrigin(0, 0);

      this.add.text(10, game.config.height/2 - 200, "As they talked about games he realize,", mediumConfig);
      this.add.text(10, game.config.height/2 - 100, "instead of trying to mold himself out of fear,", mediumConfig);
      this.add.text(10, game.config.height/2, "he just needed to introduce himself,", mediumConfig);
      this.add.text(10, game.config.height/2 + 100, "to become friends with them!", mediumConfig);
      this.add.text(10, game.config.height/2 + 200, "END", mediumConfig);


    }
  
    update() {

    }
}