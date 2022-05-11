let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    backgroundColor: '#FFFFFF',
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    }, 
    scene: [ Load, Menu, Weightlift, Cutscene ]
}

let game = new Phaser.Game(config);

let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE;