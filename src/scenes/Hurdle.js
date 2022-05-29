class Hurdle extends Phaser.Scene {
  constructor() {
    super("hurdleScene");
  }

  create() {
    //adding sprites
    this.hurdleBG = this.add.tileSprite(0, 0, 960, 540, 'hurdleBG').setOrigin(0, 0);
    this.hurdleSprite = this.physics.add.sprite(225, 370, 'hurdleMC').setOrigin(0, 0);

    this.hurdleGroup = this.add.group({
      runChildUpdate: true
    });
    this.hurdle = this.physics.add.sprite(850, 460, 'hurdle').setOrigin(0, 0).setVelocityX(-300);
    for (let i = 1; i < 10; i++) {
      let hurdle = this.physics.add.sprite(850, 460, 'hurdle').setOrigin(0, 0).setVelocityX(-300);;
      this.hurdleGroup.add(hurdle);
    };
    
    //hurdle sprite physics
    this.hurdleSprite.setCollideWorldBounds(true);
    this.hurdleSprite.setGravityY(650);
    this.hurdleSprite.body.setSize(80, 170, 20, 10);

    //hurdle physics
    this.hurdle.body.setSize(82, 80, 10, 0);

    // input
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // score
    this.hurdleScore = 0;
    this.scoreText = this.add.text(0, 0, 'Leaps: ' + this.hurdleScore, smallConfig);

    //next scene arrow
    this.nextArrow = this.add.sprite(50, 500, 'arrow').setAlpha(1).setScale(2);
    this.nextArrow.setInteractive({
        useHandCursor: true,
    });
        // click on a Game Object
    this.input.on('gameobjectdown', (pointer, gameObject, event) => {
        cutsceneState = 'end';
        this.scene.start('cutScene');
    });
  }

  update() {

    this.physics.world.overlap(this.hurdleSprite, this.hurdle, this.hurdleCollision, null, this);

    this.hurdleBG.tilePositionX -= 3;
    if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
      if (this.hurdleSprite.y == 370) {
        this.hurdleSprite.setVelocityY(-400);
      }
      //this.hurdleScore += 1;
      //this.scoreText.setText('Leaps: ' + this.hurdleScore);
    }

    //destroy hurdles
    if (this.hurdle.x == -75){
      this.hurdle.destroy();
    }
  }

  hurdleCollision() {
    this.hurdle.destroy();
  } 
}