class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload(){
        this.load.image('weightliftDown', './assets/tempWeightliftDown.png');
        this.load.image('weightliftUp', './assets/tempWeightliftUp.png');
        this.load.image('cutsceneMC', './assets/tempCutsceneMC.png');
        this.load.image('cutsceneCoolKids', './assets/tempCoolKids.png');
        this.load.image('arrow', './assets/arrow.png');
        this.load.image('weightSpeechBubble', './assets/tempWeightSpeech.png');
        this.load.image('teardrop', './assets/tempTeardrop.png');
    }

    update(){
        console.log('loading');
        this.scene.start('cutScene');
    }
}