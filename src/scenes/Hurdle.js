class Hurdle extends Phaser.Scene {
  constructor() {
    super("hurdleScene");
  }

  create() {

    // camera fade in
    this.cameras.main.fadeIn(500, 255, 255, 255);

    //adding sprites
    this.hurdleBG = this.add.tileSprite(0, 0, 960, 540, 'hurdleBG').setOrigin(0, 0);
    this.hurdleSprite = this.physics.add.sprite(225, 370, 'hurdleRun').setOrigin(0, 0);
    this.hurdleJump = this.physics.add.sprite(225, 370, 'hurdleJump').setOrigin(0, 0).setAlpha(0);
    this.hurdle = this.physics.add.sprite(850, 460, 'hurdle').setOrigin(0, 0).setVelocityX(-300);
    
    // hurdle sprite physics
    this.hurdleSprite.setCollideWorldBounds(true);
    this.hurdleSprite.setGravityY(650);
    this.hurdleSprite.body.setSize(80, 170, 20, 10);

    // hurdle jump physics
    this.hurdleJump.setCollideWorldBounds(true);
    this.hurdleJump.setGravityY(650);
    this.hurdleJump.body.setSize(80, 170, 25, 10);

    //hurdle physics
    this.hurdle.body.setSize(82, 80, 10, 0);

    // input
    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    // score & text
    this.hurdleScore = 0;
    this.scoreText = this.add.text(100, 425, 'Leaps: ' + this.hurdleScore, smallConfig);
    this.add.text(350, 85, "Press SPACE to jump!", smallConfig);

    //next scene arrow
    this.nextArrow = this.add.sprite(50, 500, 'arrow').setAlpha(0).setScale(2);
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
          this.nextArrow.destroy();
          // camera fade out
          this.cameras.main.fadeOut(500, 255, 255, 255);
          this.BGM.stop();
          this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.BGM.stop();
            cutsceneState = 'end';
            this.scene.start('cutScene');
          })
        }
      
        if (gameObject == this.restart){
        this.BGM.stop();
        cutsceneState = 'start';
        this.scene.start('menuScene');
        }
    });

    // success message
    this.successBackground = this.add.rectangle(450, 275, 1200, 300, '0xD4D4D4').setAlpha(0);
    this.successMessage = this.add.text(game.config.width/2, game.config.height/2, 'Success!', successConfig).setOrigin(0.5,0.5).setAlpha(0);
    this.altMessage = this.add.text(game.config.width/2, game.config.height/2 + 125, '(Just approach them already!)', smallConfig).setOrigin(0.5,0.5).setAlpha(0);


    // SFX
    this.jumpSFX = this.sound.add('jumpSFX', {volume: 0.5});
    this.hurdleHit = this.sound.add('hurdleHit', {volume: 0.3});
    this.success = this.sound.add('mgSuccess', {volume: 0.3});

    // BGM
    this.BGM = this.sound.add('minigameBGM', {volume: 0.1});
    this.BGM.setLoop(true);
    this.BGM.play();

    // Running animation
    this.tweens.add({

      targets: this.hurdleSprite,
      angle: {from: -5, to: 0},
      duration: 100,
      yoyo: true,
      loop: -1
 
    });

    //check for success sfx
    this.successCheck = false;
  }

  update() {
    
    // Collision Detection
    this.physics.world.overlap(this.hurdleSprite, this.hurdle, this.hurdleCollision, null, this);
    this.physics.world.overlap(this.hurdleJump, this.hurdle, this.hurdleCollision, null, this);

    // Background scrolling
    this.hurdleBG.tilePositionX += 4;

    // Jump input
    if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
      if (this.hurdleSprite.y == 370) {
        this.hurdleJump.setVelocityY(-400);
        this.hurdleSprite.setVelocityY(-400);
        this.hurdleSprite.setAlpha(0);
        this.hurdleJump.setAlpha(1);
        this.jumpSFX.play();
        this.clock = this.time.delayedCall(1200, () => {
          this.hurdleSprite.setAlpha(1);
          this.hurdleJump.setAlpha(0);
        });
      }
    }

    //resets hurdles after success
    if (this.hurdle.x <= -75){
      this.hurdle.x = 1000;
      this.hurdleScore ++;
      this.scoreText.setText('Leaps: ' + this.hurdleScore);
    }

    // End state
    if (this.hurdleScore == 5) {
      if (this.successCheck == false){
        this.success.play();
        this.successCheck = true;
      };
      this.hurdle.setAlpha(0);
      this.hurdleJump.setAlpha(0);
      this.hurdleHit.setMute(true);
      this.nextArrow.setAlpha(1);
      this.successBackground.setAlpha(1);
      this.successMessage.setAlpha(1);
      this.scoreText.setText('Nice Job!');
    }
  }

  //resets hurdles after failure
  hurdleCollision() {
    this.hurdle.x = 1000;
    this.hurdleHit.play();
  };
}