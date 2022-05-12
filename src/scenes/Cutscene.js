class Cutscene extends Phaser.Scene {
    constructor() {
        super("cutScene");
    }

    create() {

        // Event Flags
        this.movingFlag = true;
        this.speechFlag = false;
        this.teardropFlag = false;
        this.finishedFlag = false;

        this.sceneTicks = 0;

        // added keycode
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // checks what kind of cutscene we are in, and puts appropriate text
        if (cutsceneState == 'start'){
            this.bg = this.add.sprite(0,0, 'cutsceneBG').setOrigin(0, 0);

            this.mainGuy = this.add.sprite(100, 150, 'cutsceneMC').setOrigin(0.5,0.5);
            this.coolKids = this.add.sprite(700, 350, 'cutsceneCoolKids').setOrigin(0.5,0.5);
            
            this.coolBench = this.add.sprite(160,230, 'coolBench').setOrigin(0,0);
            this.mcBench = this.add.sprite(0,0, 'mcBench').setOrigin(0,0);
            
            this.speechBubble = this.add.sprite(800, 200, 'weightSpeechBubble').setOrigin(0.5,0.5).setAlpha(0);
            this.teardrop = this.add.sprite(280, 50, 'teardrop').setOrigin(0.5,0.5).setAlpha(0);
            // this.add.text(0, game.config.height/2, "press space to start", textConfig);
        } else if (cutsceneState == 'end'){
            this.add.text(0, game.config.height/2, "you are STRONG!", textConfig);
        }
        

    }

    update() {

        // if the cutscene is the start one
        if (cutsceneState == 'start'){
            // MOving segment
            if (this.movingFlag){
                if (this.mainGuy.x < 300){
                    this.mainGuy.x++;    //move the mc
                } else {
                    // change part of scene
                    this.movingFlag = false;
                    this.speechFlag = true;
                }
            } else if (this.speechFlag){
                // reveal the speachbubble
                this.speechBubble.setAlpha(1);
                this.sceneTicks++;
                // after one sec, change part of scene
                if (this.sceneTicks > 100){
                    this.speechFlag = false;
                    this.teardropFlag = true;
                }
            } else if (this.teardropFlag){
                // reveal teardrop
                this.teardrop.setAlpha(1);
                // make teardrop fall down face
                if (this.teardrop.y < 100){
                    this.teardrop.y++;
                } else {
                    this.teardropFlag = false;
                    this.finishedFlag = true;
                }
            } else if (this.finishedFlag) {
                // allow player to press space to begin!
                this.add.text(0, game.config.height/2, "press space to start", textConfig);
                if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                    this.scene.start("weightliftScene");
                }
            }
        }
    }

}