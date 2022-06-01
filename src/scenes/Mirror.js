class Mirror extends Phaser.Scene {
    constructor() {
        super("mirrorScene");
    }

    create() {
        console.log("we in mirror modes");

        // camera fade in
        this.cameras.main.fadeIn(500, 255, 255, 255);

        // adds Main charecter sprites
        this.mirrorOpen = this.add.sprite(0, 0, 'mirrorOpen').setAlpha(0).setOrigin(0, 0);
        this.mirrorClosed = this.add.sprite(0, 0, 'mirrorClosed').setAlpha(1).setOrigin(0, 0);

        //flags for simple sprite animation
        this.mouthTicks = 0;
        this.mouthOpen = true;

        // text configuration
        this.add.text(370, 25, "Type -anything- to practice speaking!", smallConfig);


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
                this.BGM.stop();
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.BGM.stop();
                    cutsceneState = 'maze';
                    this.scene.start('cutScene');
                })
            }
            
            if (gameObject == this.restart){
            this.BGM.stop();
            cutsceneState = 'start';
            this.scene.start('menuScene');
            }
        });

        // SFX
        this.success = this.sound.add('mgSuccess', {volume: 0.3});

        //check for success sfx
        this.successCheck = false;

        // BGM
        this.BGM = this.sound.add('minigameBGM', {volume: 0.1});
        this.BGM.setLoop(true);
        this.BGM.play();

        // Tracks how much the player hit their keyboard
        this.playerProgress = 0;

        this.playerText = this.add.text(650, 100, "", smallConfig);

        this.input.keyboard.on('keydown', event => {

            // every time the player hits a key, reveal a letter from the final message
            console.log(event);
            this.playerProgress++;
            this.playerText.setText("I am cool. \nI am funny! \nI can talk to them!".substring(0, this.playerProgress));

            // Open or close mouth depending on keyboard use
            if (this.mouthOpen){
                this.mirrorOpen.setAlpha(1);
                this.mirrorClosed.setAlpha(0);
                this.mouthOpen = false;
                this.mouthTicks = 0;
            } else {
                this.mirrorClosed.setAlpha(1);
                this.mirrorOpen.setAlpha(0);
                this.mouthOpen = true;
                this.mouthTicks = 0;
            }

            // End scene once full message is played.
            if (this.playerProgress == 45){
                if (this.successCheck == false){
                    this.success.play();
                    this.successCheck = true;
                };
                this.successBackground.setAlpha(1);
                this.successMessage.setAlpha(1);
                this.altMessage.setAlpha(1);
                this.nextArrow.setAlpha(1);
            }

        });


        // Add Success message
        this.successBackground = this.add.rectangle(450, 275, 1200, 300, '0xD4D4D4').setAlpha(0);
        this.successMessage = this.add.text(game.config.width/2, game.config.height/2, 'Success!', successConfig).setOrigin(0.5,0.5).setAlpha(0);
        this.altMessage = this.add.text(game.config.width/2, game.config.height/2 + 125, '(Hey, you\'re feeling a bit more confident!)', smallConfig).setOrigin(0.5,0.5).setAlpha(0);


        this.tweens.add({

            targets: this.nextArrow,
            scale: 2.2,
            duration: 500,
            yoyo: true,
            repeat: -1
    
          });
    }

}