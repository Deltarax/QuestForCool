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
        this.load.image('restart', './assets/tempRestart.png');

        this.load.image('weightliftDown', './assets/weightliftDown.png');
        this.load.image('weightliftUp', './assets/weightliftUp.png');
        this.load.image('weightliftBG', './assets/weightliftBG.png')

        this.load.image('mirrorOpen', './assets/mirrorOpen.png');
        this.load.image('mirrorClosed', './assets/mirrorClosed.png');
        
        this.load.image('weightSpeechBubble', './assets/tempWeightSpeech.png'); //temp
        this.load.image('mirrorSpeechBubble', './assets/tempMirrorSpeech.png'); //temp
        this.load.image('mazeSpeechBubble', './assets/tempMazeSpeech.png'); //temp
        this.load.image('hurdleSpeechBubble', './assets/tempHurdleSpeech.png'); //temp
        this.load.image('endSpeechBubble', './assets/tempEndSpeech.png'); //temp
        this.load.image('teardrop', './assets/tempTeardrop.png'); //temp
        this.load.image('surprise', './assets/tempSurprise.png'); //temp

        this.load.image('corn', './assets/tempCorn.png'); //temp
        this.load.image('mazeHead', './assets/mazeMC.png');
        this.load.image('CK1', './assets/mazeCK1.png');
        this.load.image('CK2', './assets/mazeCK2.png');
        this.load.image('CK3', './assets/mazeCK3.png')

        this.load.image('hurdle', './assets/tempHurdle.png'); //temp
        this.load.image('hurdleRun', './assets/hurdleRun.png');
        this.load.image('hurdleJump', './assets/hurdleJump.png');
        this.load.image('hurdleBG', './assets/tempHurdleBG.png'); //temp, might leave

        // music and sound
        this.load.audio('minigameBGM', './assets/minigame.mp3');
        this.load.audio('weights', './assets/weightsSFX.wav');
        this.load.audio('mirrorSuccess', './assets/mirrorSuccess.wav');
        this.load.audio('jumpSFX', './assets/jumpSFX.wav');
        this.load.audio('hurdleHit', './assets/hurdleHit.wav');

        //html elements
        this.load.html('nameform', 'assets/nameform.html');
    }

    update(){
        console.log('loading');

        this.scene.start('weightliftScene');
        cutsceneState = 'start';
    }
}