class Mirror extends Phaser.Scene {
    constructor() {
        super("mirrorScene");
    }

    create() {
        console.log("we in mirror mode");

        // text configuration

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
            cutsceneState = 'end';
            this.scene.start('cutScene');
        });



    }

    update() {
        
        
    }

}