class Maze extends Phaser.Scene {
    constructor() {
        super("mazeScene");
    }

    create() {
        console.log("we in maze mode");

        //flags for simple sprite animation
        this.gameOver = false;

        // text configuration
        this.add.text(50, 25, "Use Arrow keys to move!     Don't touch the walls!", smallConfig);
        // this.add.text(50, 75, "Don't touch the walls!", smallConfig);

        // adds Main charecter sprites
        this.mazeHead = this.physics.add.sprite(25, 320, 'mazeHead').setOrigin(0.5, 0.5).setScale(0.12);
        this.mazeHead.body.setCircle(this.mazeHead.width / 2);
        this.mazeHead.setCollideWorldBounds(true);
        this.mazeHead.setInteractive({
            draggable: true,
            useHandCursor: true
        });
        // this.mazeHead.body.immovable = true;

        // create arrowkeys
        this.arrowkeys = this.input.keyboard.createCursorKeys();

        // Create the corn maze block group
        this.cornMaze = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        // Matrix for maze layout (1 = wall, 0 = path)
        this.mazeMatrix = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        
        // Loop to place maze blocks
        for (let i = 0; i < this.mazeMatrix.length; i++){
            for (let j = 0; j < this.mazeMatrix[i].length; j++){
                if (this.mazeMatrix[i][j] == 1){
                    // this.add.rectangle(70 + (j * 40), 120 + (i * 40), 40, 40, 0x005500);
                    let corn = this.physics.add.sprite(20 + (j * 40), 120 + (i * 40), 'corn');
                    corn.body.immovable = true;
                    this.cornMaze.add(corn);
                }
            }
        }

        // So we can see the next arrow
        this.whiteRectangle = this.add.rectangle(60, 500, 120, 80, '0xFFFFFF').setAlpha(0);

        // Create the green arrow, link it to next scene, and hide it before it's needed.
        this.nextArrow = this.add.sprite(50, 500, 'arrow').setAlpha(0).setScale(2);
        this.nextArrow.setInteractive({
            useHandCursor: true,
        });
        // click on a Game Object
        this.input.on('gameobjectdown', (pointer, gameObject, event) => {
            if (gameObject == this.nextArrow){
                cutsceneState = 'hurdle';
                this.scene.start('cutScene');
            }
        });

        // Add Success message
        this.successBackground = this.add.rectangle(450, 275, 1200, 300, '0xFFFFFF').setAlpha(0);
        this.successMessage = this.add.text(game.config.width/2, game.config.height/2, 'Success!', successConfig).setOrigin(0.5,0.5).setAlpha(0);

        this.mazeHead.on('drag', (pointer, dragX, dragY) => {
            this.mazeHead.x = dragX;
            this.mazeHead.y = dragY;
            // this.printMessage(`Dragging ${this.burrito.texture.key}...`);
        });

        // this.physics.add.collider(this.mazeHead, this.cornMaze, this.cornCollision, null, this);


    }

    update() {

        this.physics.world.collide(this.mazeHead, this.cornMaze, this.cornCollision, null, this);

        if (!this.gameOver){
            if (this.arrowkeys.up.isDown) {
                this.mazeHead.setVelocityY(-200);
            } else if (this.arrowkeys.down.isDown) {
                this.mazeHead.setVelocityY(200);
            } else if (this.arrowkeys.left.isDown) {
                this.mazeHead.setVelocityX(-200);
            } else if (this.arrowkeys.right.isDown) {
                this.mazeHead.setVelocityX(200);
            }
        }
        
        if(this.mazeHead.x > 900){
            this.gameOver = true;
            this.successMessage.setAlpha(1);
            this.successBackground.setAlpha(1);
            // this.whiteRectangle.setAlpha(1);
            this.nextArrow.setAlpha(1);
        }

        // CHEAT TO END
        if(this.arrowkeys.left.isDown && this.arrowkeys.right.isDown){
            this.gameOver = true;
            this.successMessage.setAlpha(1);
            this.successBackground.setAlpha(1);
            // this.whiteRectangle.setAlpha(1);
            this.nextArrow.setAlpha(1);
        }

        this.tweens.add({

            targets: this.nextArrow,
            scale: 2.2,
            duration: 500,
            yoyo: true,
            repeat: -1
    
          });
    }

    cornCollision() {
        console.log('hit');
        this.mazeHead.setInteractive({
            draggable: false,
            useHandCursor: false
        });
        // this.mazeHead.x = 25;
        // this.mazeHead.y = 320;
        this.mazeHead.setInteractive({
            draggable: true,
            useHandCursor: true
        });
    }

}