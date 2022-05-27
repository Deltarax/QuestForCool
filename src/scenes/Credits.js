class Credit extends Phaser.Scene {
    constructor() {
      super("creditScene");
    }
  
    create() {
      console.log('Inside credit');

      this.bg = this.add.sprite(0,0, 'cutsceneBG').setOrigin(0, 0);

      

      this.add.text(game.config.width/2, game.config.height/2 - 150, "Credits:", mediumConfig).setOrigin(0.5,0.5);
      this.add.text(game.config.width/2, game.config.height/2 - 100, "Programming: Jackson Gerard", mediumConfig).setOrigin(0.5,0.5);
      this.add.text(game.config.width/2, game.config.height/2 - 50, "Art: Esmerelda", mediumConfig).setOrigin(0.5,0.5);
      this.add.text(game.config.width/2, game.config.height/2 + 0, "Sound and Design: Solomon", mediumConfig).setOrigin(0.5,0.5);



      // Create the green arrow, link it to next scene, and hide it before it's needed.
      this.nextArrow = this.add.sprite(50, 500, 'arrow').setAlpha(1).setScale(2);
      this.nextArrow.setInteractive({
          useHandCursor: true,
      });
      // click on a Game Object
      this.input.on('gameobjectdown', (pointer, gameObject, event) => {
          this.scene.start('menuScene');
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