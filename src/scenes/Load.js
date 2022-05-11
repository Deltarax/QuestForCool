class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload(){
        this.load.image('weightliftDown', './assets/tempWeightliftDown.png');
        this.load.image('weightliftUp', './assets/tempWeightliftUp.png');
        this.load.image('arrow', './assets/arrow.png');
    }

    update(){
        console.log('loading');
        this.scene.start('cutScene');
    }
}