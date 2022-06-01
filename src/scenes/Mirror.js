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
        this.mirrorSuccess = this.sound.add('mirrorSuccess', {volume: 0.3});

        // BGM
        this.BGM = this.sound.add('minigameBGM', {volume: 0.1});
        this.BGM.setLoop(true);
        this.BGM.play();

        // Taken from Nathan's lowKey

        this.playerProgress = 0;

        this.playerText = this.add.text(650, 100, "", smallConfig);

        this.input.keyboard.on('keydown', event => {

            console.log(event);
            this.playerProgress++;
            this.playerText.setText("I am cool. \nI am funny! \nI can talk to them!".substring(0, this.playerProgress));

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

            if (this.playerProgress == 45){
                this.mirrorSuccess.play();
                this.successBackground.setAlpha(1);
                this.successMessage.setAlpha(1);
                this.nextArrow.setAlpha(1);
            }

        });


        // this.textBox = this.add.dom(450, 400).createFromCache('nameform');



        // watch for keycombomatches
        this.input.keyboard.on('keycombomatch', (combo, event) => {
            if (combo === firstCombo) { 
                this.firstPhrase.setAlpha(0);
                this.mirrorSuccess.play();
                this.secondPhrase.setAlpha(1);
            }
            if (combo === secondCombo) {
                this.secondPhrase.setAlpha(0);
                this.mirrorSuccess.play();
                this.thirdPhrase.setAlpha(1);
            }   
            if (combo === thirdCombo) {
                this.thirdPhrase.setAlpha(0);
                this.mirrorSuccess.play();
                this.successBackground.setAlpha(1);
                this.successMessage.setAlpha(1);
                this.nextArrow.setAlpha(1);
            }   
        });

        // Add Success message
        this.successBackground = this.add.rectangle(450, 275, 1200, 300, '0xD4D4D4').setAlpha(0);
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

        // Simple animation for the mouth
        // this.mouthTicks++;
        // if (this.mouthTicks >= 50){
        //     if (this.mouthOpen){
        //         this.mirrorOpen.setAlpha(0);
        //         this.mirrorClosed.setAlpha(1);
        //         this.mouthOpen = false;
        //         this.mouthTicks = 0;
        //     } else {
        //         this.mirrorClosed.setAlpha(0);
        //         this.mirrorOpen.setAlpha(1);
        //         this.mouthOpen = true;
        //         this.mouthTicks = 0;
        //     }
        // }
        
    }

}