class Weightlift extends Phaser.Scene {
    constructor() {
        super("weightliftScene");
    }

    create() {
        console.log("we in weightlift");

        // text configuration
        let textConfig = {
            fontFamily: 'Roboto',
            fontSize: '85px',
            // backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        // adds weightlifter down and up
        this.weightliftDown = this.add.sprite(300, 300, 'weightliftDown').setAlpha(1);
        this.weightliftUp = this.add.sprite(300, 300, 'weightliftUp').setAlpha(0);
        this.next = this.add.sprite(900, 500, 'arrow').setAlpha(0);
        this.next.setInteractive({
            useHandCursor: true,
        });
        // click on a Game Object
        this.input.on('gameobjectdown', (pointer, gameObject, event) => {
            this.scene.start('cutScene');
        });

        // instructions
        this.add.text(30, 400, "press space to LIFT!!!", textConfig); 

        // reserves keeys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // flag for weightlifting
        this.weightdownFlag = true;

        this.weightTicks = 0;
        this.weightScore = 0;

        this.scoreText = this.add.text(400, 200, 'Gains: ' + this.weightScore, textConfig);

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
            } else {
                this.weightliftDown.setAlpha(1);
                this.weightliftUp.setAlpha(0);
                this.weightdownFlag = true;
                this.weightScore++;
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

        if (this.weightScore == 100) {
            this.next.setAlpha(1);
        }
        
    }

}