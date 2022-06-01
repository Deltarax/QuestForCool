let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    autoCenter: true,
    backgroundColor: '#81B622',
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    }, 
    dom: {
        createContainer: true
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    }, 
    scene: [ Load, Menu, Weightlift, Cutscene, Mirror, Intro, End, Maze, Hurdle, Credit]
}

let textConfig = {
    fontFamily: 'Amatic-Bold',
    fontSize: '100px',
    // backgroundColor: '#FFFFFF',
    color: '#000000',
    align: 'right',
    padding: {
    top: 15,
    bottom: 15,
    },
    fixedWidth: 0
}

let smallConfig = {
    fontFamily: 'AmaticSC-Regular',
    fontSize: '50px',
    // backgroundColor: '#FFFFFF',
    color: '#000000',
    align: 'left',
    padding: {
    top: 15,
    bottom: 15,
    },
    fixedWidth: 0
}

let mediumConfig = {
    fontFamily: 'AmaticSC-Regular',
    fontSize: '65px',
    // backgroundColor: '#FFFFFF',
    color: '#000000',
    align: 'right',
    padding: {
    top: 15,
    bottom: 15,
    },
    fixedWidth: 0
}

let successConfig = {
    fontFamily: 'Amatic-Bold',
    fontSize: '240px',
    backgroundColor: '#D4D4D4',
    color: '#00BB00',
    align: 'right',
    padding: {
    top: 15,
    bottom: 15,
    },
    fixedWidth: 0
}

let game = new Phaser.Game(config);

let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN, keySPACE;

let cutsceneState = 'start';

let element;