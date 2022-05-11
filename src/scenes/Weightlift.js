class Weightlift extends Phaser.Scene {
    constructor() {
        super("weightliftScene");
    }

    create() {
        console.log("we in weightlift");

        this.weightliftDown = this.add.sprite(300, 300, 'weightliftDown').setAlpha(1);
        this.weightliftUp = this.add.sprite(300, 300, 'weightliftUp').setAlpha(0);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.weightdownFlag = true;

    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if (this.weightdownFlag){
                this.weightliftDown.setAlpha(0);
                this.weightliftUp.setAlpha(1);
                this.weightdownFlag = false;
            } else {
                this.weightliftDown.setAlpha(1);
                this.weightliftUp.setAlpha(0);
                this.weightdownFlag = true;
            }


        }
        
    }

}