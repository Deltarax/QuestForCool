class Cutscene extends Phaser.Scene {
    constructor() {
        super("cutScene");
    }

    create() {

        // added keycode
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // checks what kind of cutscene we are in, and puts appropriate text
        if (cutsceneState == 'start'){
            console.log('here');
            this.add.text(0, game.config.height/2, "press space to start", textConfig);
        } else if (cutsceneState == 'end'){
            this.add.text(0, game.config.height/2, "you are STRONG!", textConfig);
        }
        

    }

    // If we are in the beginning, press start to play!
    update() {
        if (cutsceneState == 'start'){
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.scene.start("weightliftScene");
            }
        }
    }

}