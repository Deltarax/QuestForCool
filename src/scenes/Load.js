class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload(){
        // elements for cutscene background
        this.load.image('cutsceneBG', './assets/bg.png');
        this.load.image('coolBench', './assets/coolKidsBenchF.png');
        this.load.image('mcBench', './assets/mcBenchF.png');
        this.load.image('cutsceneMC', './assets/MCF.png');
        this.load.image('arrow', './assets/arrow.png');

        this.load.image('weightliftDown', './assets/weightliftDown.png');
        this.load.image('weightliftUp', './assets/weightliftUp.png');
        this.load.image('weightliftBG', './assets/weightliftBG.png')

        this.load.image('mirrorOpen', './assets/tempMirrorTalk.png'); //temp
        this.load.image('mirrorClosed', './assets/tempMirrorTalk2.png'); //temp
        
        this.load.image('weightSpeechBubble', './assets/tempWeightSpeech.png'); //temp
        this.load.image('mirrorSpeechBubble', './assets/tempMirrorSpeech.png'); //temp
        this.load.image('mazeSpeechBubble', './assets/tempMazeSpeech.png'); //temp
        this.load.image('hurdleSpeechBubble', './assets/tempHurdleSpeech.png'); //temp
        this.load.image('endSpeechBubble', './assets/tempEndSpeech.png'); //temp
        this.load.image('teardrop', './assets/tempTeardrop.png'); //temp
        this.load.image('surprise', './assets/tempSurprise.png'); //temp

        this.load.image('corn', './assets/tempCorn.png'); //temp
        this.load.image('mazeHead', './assets/mazeMC.png');

        this.load.image('hurdle', './assets/tempHurdle.png'); //temp
        this.load.image('hurdleMC', './assets/hurdleRun.png');
        this.load.image('hurdleJump', './assets/hurdleJump');
        this.load.image('hurdleBG', './assets/tempHurdleBG.png'); //temp, might leave

        // music and sound
        this.load.audio('weights', './assets/weightsSFX.wav')

        //html elements
        this.load.html('nameform', 'assets/nameform.html');
    }

    update(){
        console.log('loading');

        this.scene.start('creditScene');
        cutsceneState = 'start';
    }
}