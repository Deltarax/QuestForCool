class Hurdle extends Phaser.Scene {
    constructor() {
      super("hurdleScene");
    }
  
    create() {
        this.hurdleSprite = this.add.sprite(300, 300, 'hurdleMC');
        this.hurdle = this.add.sprite(300, 300, 'hurdle');
        this.hurdleBG = this.add.tilesprite(0, 0, 960, 540, 'hurdleBG');
    }
  
    update() {
      
    }
  }