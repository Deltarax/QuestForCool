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

        // End cutscene special flags
        this.surpriseFlag = false;
        this.endMovementFlag = false;

        this.sceneTicks = 0;

        // added keycode
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Sprites for cutscene
        this.bg = this.add.sprite(0,0, 'cutsceneBG').setOrigin(0, 0);
        this.mainGuy = this.add.sprite(180, 180, 'cutsceneMC').setOrigin(0.5,0.5).setScale(.3);
        this.coolBench = this.add.sprite(250,180, 'coolBench').setOrigin(0,0);
        this.mcBench = this.add.sprite(220,290, 'mcBench').setOrigin(0.5, 0.5);
        this.teardrop = this.add.sprite(280, 50, 'teardrop').setOrigin(0.5,0.5).setAlpha(0);

        // checks what kind of cutscene we are in, and puts appropriate text
        if (cutsceneState == 'start'){
            this.speechBubble = this.add.sprite(850, 160, 'weightSpeechBubble').setOrigin(0.5,0.5).setAlpha(0);
        } else if (cutsceneState == 'mirror'){
            this.speechBubble = this.add.sprite(850, 160, 'mirrorSpeechBubble').setOrigin(0.5,0.5).setAlpha(0);
        } else if (cutsceneState == 'maze'){
            this.speechBubble = this.add.sprite(850, 160, 'mazeSpeechBubble').setOrigin(0.5,0.5).setAlpha(0);
            this.speechBubble = this.add.sprite(800, 200, 'mazeSpeechBubble').setOrigin(0.5,0.5).setAlpha(0);
        } else if (cutsceneState == 'hurdle'){
            this.speechBubble = this.add.sprite(800, 200, 'hurdleSpeechBubble').setOrigin(0.5,0.5).setAlpha(0);
        } else if (cutsceneState == 'end'){
            this.speechBubble = this.add.sprite(850, 160, 'endSpeechBubble').setOrigin(0.5,0.5).setAlpha(0);
            this.surprise = this.add.sprite(280, 50, 'surprise').setOrigin(0.5,0.5).setAlpha(0);
        }
        
        // Create the green arrow, link it to next scene, and hide it before it's needed.
        this.nextArrow = this.add.sprite(50, 500, 'arrow').setAlpha(0).setScale(2);
        this.nextArrow.setInteractive({
            useHandCursor: true,
        });
        // click on a Game Object
        this.input.on('gameobjectdown', (pointer, gameObject, event) => {
            // depending on what cutscene, start the correct game
            if (cutsceneState == 'start'){
                this.scene.start("weightliftScene");
            } else if (cutsceneState == 'mirror'){
                this.scene.start("mirrorScene");
            } else if (cutsceneState == 'maze'){
                this.scene.start("mazeScene");
            } else if (cutsceneState == 'hurdle'){
                this.scene.start("hurdleScene");
            } else if (cutsceneState == 'end'){
                this.scene.start("endScene");
            }
        });

    }

    update() {

        // Moving segment
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

                // If we are in the ending cutscene, change paths
                if (cutsceneState == 'end'){
                    this.surpriseFlag = true;
                } else {
                    this.teardropFlag = true;
                }
            }


        // -------IF STANDARD CUTSCENE, PLAY TEARDROP------------
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
        // ------------------------------------------------------

        //-------IF FINAL CUTSCENE, PLAY VARIATION---------------
        } else if (this.surpriseFlag){
            // reveal teardrop
            this.surprise.setAlpha(1);
            this.sceneTicks++;
            if (this.sceneTicks >= 150){
                this.surprise.setAlpha(0);
                this.surpriseFlag = false;
                this.endMovementFlag = true;
            }
        } else if (this.endMovementFlag){
            if (this.mainGuy.x < 430){
                this.mainGuy.x++; 
                this.mainGuy.x++;    // move the mc to the right more
            } else if (this.mainGuy.y < 350){
                this.mainGuy.setDepth(1);
                this.mainGuy.y++;
                this.mainGuy.y++;    // move the mc down to the cool kids
            }else {
                // change part of scene
                this.endMovementFlag = false;
                this.finishedFlag = true;
            }

        //-------------------------------------------------------


        } else if (this.finishedFlag) {
            // allow player to press space to begin!
            this.nextArrow.setAlpha(1);
        }
    }

}