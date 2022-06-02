// Created by Esme Rangel, Jackson Gerard, and Solomon Bell
// Completed 06/01/2022

// Creative Tilt: Our biggest goal for the project was to create a narrative experience that had a soft, storybook aesthetic and quick, simple minigames.
// We succeed in this threefold.
// One: We centralized our game around one key cutscene, allowing for players to feel a sense of familiarity with the pattern of the game as they played.
// Two: We differentiated the cutscene and the gameplay through the use of music. The minigame BGM is spunky and cool, whereas the cutscene BGM is much more airy and relaxed.
// Three: All art assets were made specifically to lean into a storyboard-esque aesthetic. 
// Most if not all assets were consciously made to be smooth, round, and pastel in color and shape to maintain a feeling of openness and soothing. 
// Knowing that we had limitations on time, we maintained our desire for animations by making good use of tweens, using the storyboard theming to support it. 
// Flat minimal shading maintained a feeling of youth, as our story is a coming of age tale.

// Technical Tilt: Each minigame uses a completely different (yet easily accessible) mechanic to keep the game interesting. 
// A technique we're happy about is the way the maze was created, using a matrix to place down each wall block. 
// This allowed us to easily change and implement different variations of the maze during playtesting. 
// The cutscenes we are also fond of! Since phaser 3 does not have any cutscene capabilities we had to develop them from scratch using events and timers.

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    autoCenter: true,
    backgroundColor: '#b8d8be',
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

let weightConfig = {
    fontFamily: 'Amatic-Bold',
    fontSize: '100px',
    color: '#BA835E',
    align: 'left',
    padding: {
    top: 15,
    bottom: 15,
    },
    fixedWidth: 0

}
let weight2Config = {
    fontFamily: 'Amatic-Bold',
    fontSize: '75px',
    color: '#BA835E',
    align: 'left',
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