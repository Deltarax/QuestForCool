let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    autoCenter: true,
    backgroundColor: '#FFFFFF',
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    }, 
    scene: [ Load, Menu, Weightlift, Cutscene, Mirror, Intro, End, Maze ]
}

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

let smallConfig = {
    fontFamily: 'Roboto',
    fontSize: '30px',
    // backgroundColor: '#FFFFFF',
    color: '#000000',
    align: 'right',
    padding: {
    top: 5,
    bottom: 5,
    },
    fixedWidth: 0
}

let mediumConfig = {
    fontFamily: 'Roboto',
    fontSize: '40px',
    // backgroundColor: '#FFFFFF',
    color: '#000000',
    align: 'right',
    padding: {
    top: 5,
    bottom: 5,
    },
    fixedWidth: 0
}

let game = new Phaser.Game(config);

let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE;

let cutscenePossibleStates = ['start', 'end'];
let cutsceneState = 'start';