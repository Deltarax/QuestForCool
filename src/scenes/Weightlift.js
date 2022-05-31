class Weightlift extends Phaser.Scene {
    constructor() {
        super("weightliftScene");
    }

    create() {
        console.log("we in weightlift");

        // camera fade in
        this.cameras.main.fadeIn(500, 255, 255, 255);

        // weightlift background
        this.weightliftBG = this.add.sprite(0,0, 'weightliftBG').setOrigin(0,0);

        // adds weightlifter down and up
        this.weightliftDown = this.add.sprite(0,0, 'weightliftDown').setAlpha(1).setOrigin(0,0);
        this.weightliftUp = this.add.sprite(0,0, 'weightliftUp').setAlpha(0).setOrigin(0,0);


        // Create the green arrow, link it to next scene, and hide it before it's needed.
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
                // camera fade out
                this.cameras.main.fadeOut(500, 255, 255, 255);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.BGM.stop();
                    cutsceneState = 'mirror';
                    this.scene.start('cutScene');
                })
            }
            
            if (gameObject == this.restart){
            cutsceneState = 'start';
            this.scene.start('menuScene');
            }
        });


        // instructions
        this.add.text(100, 350, "Press SPACE to lift!", mediumConfig); 
        // this.add.text(0,0,'strongboys have 50 gains', smallConfig);

        // reserves keeys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // flag for weightlifting
        this.weightdownFlag = true;
        this.gameOver = false;

        this.weightTicks = 0;   // Tracking time for loss of progress
        this.weightScore = 0;   // Tracking GAINS

        this.scoreText = this.add.text(100, 200, 'Gains: ' + this.weightScore, textConfig);
        
        // sfx
        this.weightSFX = this.sound.add('weights', {volume: 0.2});

        // bgm
        this.BGM = this.sound.add('minigameBGM', {volume: 0.1});
        this.BGM.setLoop(true);
        this.BGM.play();

        // Add Success message
        this.successBackground = this.add.rectangle(450, 275, 1200, 300, '0xFFFFFF').setAlpha(0);
        this.successMessage = this.add.text(game.config.width/2, game.config.height/2, 'Success!', successConfig).setOrigin(0.5,0.5).setAlpha(0);

        this.tweens.add({

            targets: this.nextArrow,
            scale: 2.2,
            duration: 500,
            yoyo: true,
            repeat: -1
    
          });
    }

    update() {
        this.weightTicks++;

        // changes between sprites with spacebar presses
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if (this.weightdownFlag){
                this.weightliftDown.setAlpha(0);
                this.weightliftUp.setAlpha(1);
                this.weightdownFlag = false;
                this.weightScore++;
                this.scoreText.setText('Gains: ' + this.weightScore);
                console.log(this.weightScore);
                this.weightSFX.play();
            } else {
                this.weightliftDown.setAlpha(1);
                this.weightliftUp.setAlpha(0);
                this.weightdownFlag = true;
                this.weightScore++;
                this.scoreText.setText('Gains: ' + this.weightScore);
            }

        }

        // Progress slowly goes down over time.
        if (!this.gameOver){
            if (this.weightTicks >= 20){
                if (this.weightScore > 30){
                    this.weightTicks = 0;
                    this.weightScore--;
                    this.scoreText.setText('Gains: ' + this.weightScore);
                }
            }
            if (this.weightTicks >= 50){
                if (this.weightScore > 15){
                    this.weightTicks = 0;
                    this.weightScore--;
                    this.scoreText.setText('Gains: ' + this.weightScore);
                }
            }
            if (this.weightTicks >= 100){
                this.weightTicks = 0;
                if (this.weightScore > 0){
                    this.weightScore--;
                    this.scoreText.setText('Gains: ' + this.weightScore);
                }
            }
        }
        // When sufficiently strong end game
        if (this.weightScore >= 50){
            this.gameOver = true;
            this.successBackground.setAlpha(1);
            this.successMessage.setAlpha(1);
            this.nextArrow.setAlpha(1);
            this.scoreText.setText('Nice Job!');
        }
        
    }

}