class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload(){

    }

    update(){
        console.log('loading');
        this.scene.start('weightliftScene');
    }
}