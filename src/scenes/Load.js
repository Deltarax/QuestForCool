class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload(){
        // elements for cutscene background
        this.load.image('cutsceneBG', './assets/bg.png');
        this.load.image('coolBench', './assets/coolBench.png');
        this.load.image('mcBench', './assets/mcBench.png');

        this.load.image('weightliftDown', './assets/tempWeightliftDown.png');
        this.load.image('weightliftUp', './assets/tempWeightliftUp.png');
        this.load.image('mirrorOpen', './assets/tempMirrorTalk.png');
        this.load.image('mirrorClosed', './assets/tempMirrorTalk2.png');
        this.load.image('mazeHead', './assets/tempMazeHead.png');
        this.load.image('cutsceneMC', './assets/tempCutsceneMC.png');
        this.load.image('cutsceneCoolKids', './assets/tempCoolKids.png');
        this.load.image('arrow', './assets/arrow.png');
        this.load.image('corn', './assets/tempCorn.png');
        this.load.image('weightSpeechBubble', './assets/tempWeightSpeech.png');
        this.load.image('mirrorSpeechBubble', './assets/tempMirrorSpeech.png');
        this.load.image('endSpeechBubble', './assets/tempEndSpeech.png');
        this.load.image('teardrop', './assets/tempTeardrop.png');
        this.load.image('surprise', './assets/tempSurprise.png');

        this.load.image('hurdle', './assets/tempHurdle.png');
        this.load.image('hurdleMC', './assets/tempHurdleSprite.png');
        this.load.image('hurdleBG', './assets/tempHurdleBG.png');

        // music and sound
        this.load.audio('weights', './assets/weightsSFX.wav')
    }

    update(){
        console.log('loading');

        this.scene.start('mazeScene');
        cutsceneState = 'start';
    }
}