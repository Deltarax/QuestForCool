class Mirror extends Phaser.Scene {
    constructor() {
        super("mirrorScene");
    }

    create() {
        console.log("we in mirror modes");

        //flags for simple sprite animation
        this.mouthTicks = 0;
        this.mouthOpen = true;

        // text configuration
        this.add.text(100, 50, "Type the following phrases to build charisma!", smallConfig);
        this.add.text(100, 100, "Capitalization and spaces are important!", smallConfig);

        // adds Main charecter sprites
        this.mirrorOpen = this.add.sprite(300, 300, 'mirrorOpen').setAlpha(1);
        this.mirrorClosed = this.add.sprite(300, 300, 'mirrorClosed').setAlpha(0);


        // Create the green arrow, link it to next scene, and hide it before it's needed.
        this.nextArrow = this.add.sprite(50, 500, 'arrow').setAlpha(0).setScale(2);
        this.nextArrow.setInteractive({
            useHandCursor: true,
        });
        // click on a Game Object
        this.input.on('gameobjectdown', (pointer, gameObject, event) => {
            cutsceneState = 'maze';
            this.scene.start('cutScene');
        });

        // Taken from Nathan's lowKey
        let firstCombo = this.input.keyboard.createCombo('I am cool', {
            resetOnWrongKey: true,  // if they press the wrong key is the combo reset?
            maxKeyDelay: 0,         // max delay (ms) between each key press (0 = disabled)
            resetOnMatch: false,     // if matched before, does pressing first key of combo reset?
            deleteOnMatch: true     // if combo matches, will it delete itself?
        });
        let secondCombo = this.input.keyboard.createCombo('I am funny', {
            resetOnWrongKey: true,  // if they press the wrong key is the combo reset?
            maxKeyDelay: 0,         // max delay (ms) between each key press (0 = disabled)
            resetOnMatch: false,     // if matched before, does pressing first key of combo reset?
            deleteOnMatch: true    // if combo matches, will it delete itself?
        });
        let thirdCombo = this.input.keyboard.createCombo('I can talk to them', {
            resetOnWrongKey: true,  // if they press the wrong key is the combo reset?
            maxKeyDelay: 0,         // max delay (ms) between each key press (0 = disabled)
            resetOnMatch: false,     // if matched before, does pressing first key of combo reset?
            deleteOnMatch: true    // if combo matches, will it delete itself?
        });
        
        this.firstPhrase = this.add.text(450, 300, "I am cool", smallConfig).setAlpha(1);
        this.secondPhrase = this.add.text(450, 300, "I am funny", smallConfig).setAlpha(0);
        this.thirdPhrase = this.add.text(450, 300, "I can talk to them", smallConfig).setAlpha(0);

        this.playerProgress = 0;

        this.playerText = this.add.text(450, 400, "Type here", smallConfig);

        this.input.keyboard.on('keydown', event => {

            console.log(event);
            this.playerProgress++;
            this.playerText.setText("I am cool \n I am funny \n I can talk to them".substring(0, this.playerProgress));

        });


        // this.textBox = this.add.dom(450, 400).createFromCache('nameform');



        // watch for keycombomatches
        this.input.keyboard.on('keycombomatch', (combo, event) => {
            if (combo === firstCombo) { 
                this.firstPhrase.setAlpha(0);
                this.secondPhrase.setAlpha(1);
            }
            if (combo === secondCombo) {
                this.secondPhrase.setAlpha(0);
                this.thirdPhrase.setAlpha(1);
            }   
            if (combo === thirdCombo) {
                this.thirdPhrase.setAlpha(0);
                this.successBackground.setAlpha(1);
                this.successMessage.setAlpha(1);
                this.nextArrow.setAlpha(1);
            }   
        });

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

        // Simple animation for the mouth
        this.mouthTicks++;
        if (this.mouthTicks >= 50){
            if (this.mouthOpen){
                this.mirrorOpen.setAlpha(0);
                this.mirrorClosed.setAlpha(1);
                this.mouthOpen = false;
                this.mouthTicks = 0;
            } else {
                this.mirrorClosed.setAlpha(0);
                this.mirrorOpen.setAlpha(1);
                this.mouthOpen = true;
                this.mouthTicks = 0;
            }
        }
        
    }

}